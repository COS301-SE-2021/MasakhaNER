from tensorflow.python.client import device_lib
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint, TensorBoard
from tensorflow.keras.optimizers import RMSprop
from tensorflow.keras.layers import Input, Dense, GRU, Embedding
from tensorflow.keras.models import Model
import os
import math
import IPython
import pickle
import pandas as pd
import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
get_ipython().run_line_magic('matplotlib', 'inline')


print(device_lib.list_local_devices())


class TokenizerWrap(Tokenizer):
    """Wrap the Tokenizer-class from Keras with more functionality."""

    def __init__(self, texts, padding,
                 reverse=False, num_words=None):
        """
        :param texts: List of strings. This is the data-set.
        :param padding: Either 'post' or 'pre' padding.
        :param reverse: Boolean whether to reverse token-lists.
        :param num_words: Max number of words to use.
        """

        Tokenizer.__init__(self, num_words=num_words)

        # Create the vocabulary from the texts.
        self.fit_on_texts(texts)

        # Create inverse lookup from integer-tokens to words.
        self.index_to_word = dict(zip(self.word_index.values(),
                                      self.word_index.keys()))

        # Convert all texts to lists of integer-tokens.
        # Note that the sequences may have different lengths.
        self.tokens = self.texts_to_sequences(texts)

        if reverse:
            # Reverse the token-sequences.
            self.tokens = [list(reversed(x)) for x in self.tokens]

            # Sequences that are too long should now be truncated
            # at the beginning, which corresponds to the end of
            # the original sequences.
            truncating = 'pre'
        else:
            # Sequences that are too long should be truncated
            # at the end.
            truncating = 'post'

        # The number of integer-tokens in each sequence.
        self.num_tokens = [len(x) for x in self.tokens]

        # Max number of tokens to use in all sequences.
        # We will pad / truncate all sequences to this length.
        # This is a compromise so we save a lot of memory and
        # only have to truncate maybe 5% of all the sequences.
        self.max_tokens = np.mean(self.num_tokens) + \
            2 * np.std(self.num_tokens)
        self.max_tokens = int(self.max_tokens)

        # Pad / truncate all token-sequences to the given length.
        # This creates a 2-dim numpy matrix that is easier to use.
        self.tokens_padded = pad_sequences(self.tokens,
                                           maxlen=self.max_tokens,
                                           padding=padding,
                                           truncating=truncating)

    def token_to_word(self, token):
        """Lookup a single word from an integer-token."""

        word = " " if token == 0 else self.index_to_word[token]
        return word

    def tokens_to_string(self, tokens):
        """Convert a list of integer-tokens to a string."""

        # Create a list of the individual words.
        words = [self.index_to_word[token]
                 for token in tokens
                 if token != 0]

        # Concatenate the words to a single string
        # with space between all the words.
        text = " ".join(words)

        return text

    def text_to_tokens(self, text, reverse=False, padding=False):
        """
        Convert a single text-string to tokens with optional
        reversal and padding.
        """

        # Convert to tokens. Note that we assume there is only
        # a single text-string so we wrap it in a list.
        tokens = self.texts_to_sequences([text])
        tokens = np.array(tokens)

        if reverse:
            # Reverse the tokens.
            tokens = np.flip(tokens, axis=1)

            # Sequences that are too long should now be truncated
            # at the beginning, which corresponds to the end of
            # the original sequences.
            truncating = 'pre'
        else:
            # Sequences that are too long should be truncated
            # at the end.
            truncating = 'post'

        if padding:
            # Pad and truncate sequences to the given length.
            tokens = pad_sequences(tokens,
                                   maxlen=self.max_tokens,
                                   padding='pre',
                                   truncating=truncating)

        return tokens


with open("token_src.pickle", "rb") as f:
    tokenizer_src = pickle.load(f)

with open("token_dest.pickle", "rb") as f:
    tokenizer_dest = pickle.load(f)

mark_start = 'ssss '
mark_end = ' eeee'
token_start = tokenizer_dest.word_index[mark_start.strip()]
token_end = tokenizer_dest.word_index[mark_end.strip()]
model_encoder = tf.keras.models.load_model("model_e2")
model_decoder = tf.keras.models.load_model('model_d2')

print('THE MODEL IS', model_encoder)


def translate(input_text, true_output_text=None):
    """Translate a single text-string."""

    input_tokens = tokenizer_src.text_to_tokens(text=input_text,
                                                reverse=True,
                                                padding=True)

    initial_state = model_encoder.predict(input_tokens)

    max_tokens = tokenizer_dest.max_tokens

    shape = (1, max_tokens)
    decoder_input_data = np.zeros(shape=shape, dtype=np.int)

    # The first input-token is the special start-token for 'ssss '.
    token_int = 2

    # Initialize an empty output-text.
    output_text = ''

    # Initialize the number of tokens we have processed.
    count_tokens = 0

    # While we haven't sampled the special end-token for ' eeee'
    # and we haven't processed the max number of tokens.
    while token_int != token_end and count_tokens < max_tokens:
        # Update the input-sequence to the decoder
        # with the last token that was sampled.
        # In the first iteration this will set the
        # first element to the start-token.
        decoder_input_data[0, count_tokens] = token_int

        # Wrap the input-data in a dict for clarity and safety,
        # so we are sure we input the data in the right order.
        x_data = {
            'decoder_initial_state': initial_state,
            'decoder_input': decoder_input_data
        }

        # Note that we input the entire sequence of tokens
        # to the decoder. This wastes a lot of computation
        # because we are only interested in the last input
        # and output. We could modify the code to return
        # the GRU-states when calling predict() and then
        # feeding these GRU-states as well the next time
        # we call predict(), but it would make the code
        # much more complicated.

        # Input this data to the decoder and get the predicted output.
        decoder_output = model_decoder.predict(x_data)

        # Get the last predicted token as a one-hot encoded array.
        token_onehot = decoder_output[0, count_tokens, :]

        # Convert to an integer-token.
        token_int = np.argmax(token_onehot)

        # Lookup the word corresponding to this integer-token.
        sampled_word = tokenizer_dest.token_to_word(token_int)

        # Append the word to the output-text.
        output_text += " " + sampled_word

        # Increment the token-counter.
        count_tokens += 1

    # Sequence of tokens output by the decoder.
    output_tokens = decoder_input_data[0]

    # Print the input-text.
    print("Input text:")
    print(input_text)
    print()

    # Print the translated output-text.
    print("Translated text:")
    print(output_text)
    print()

    return output_text


# ### Examples
#
# Translate a text from the training-data. This translation is quite good. Note how it is not identical to the translation from the training-data, but the actual meaning is similar.

# In[7]:


translate(input_text="am i a good person",
          true_output_text='how are you')


# This is another example I made up. This is a better translation even though it is perhaps a more complicated text.

# In[10]:


translate(input_text="One is tired of this nation.",
          true_output_text="Today you can read in the newspaper that Denmark has become sensible.")


# This is a text from a Danish song. It doesn't even make much sense in Danish. However the translation is probably so broken because several of the words are not in the vocabulary.

# In[9]:


translate(input_text="The news that will interest you",
          true_output_text='how are you')


# ## Conclusion
#
# This tutorial showed the basic idea of using two Recurrent Neural Networks in a so-called encoder/decoder model to do Machine Translation of human languages. It was demonstrated on the very large Europarl data-set from the European Union.
#
# The model could produce reasonable translations for some texts but not for others. It is possible that a better architecture for the neural network and more training epochs could improve performance. There are also more advanced models that are known to improve quality of the translations.
#
# However, it is important to note that these models do not really understand human language. The models have no knowledge of the actual meaning of the words. The models are merely very advanced function approximators that can map between sequences of integer-tokens.

# ## Exercises
#
# These are a few suggestions for exercises that may help improve your skills with TensorFlow. It is important to get hands-on experience with TensorFlow in order to learn how to use it properly.
#
# You may want to backup this Notebook before making any changes.
#
# * Train for more than 10 epochs. Does it improve the translations?
# * Increase the size of the vocabulary. Does it improve the translations? Would it make sense to have different sizes for the vocabularies of the source and destination languages?
# * Find another data-set and use it together with Europarl.
# * Change the architectures of the neural network, for example change the state-size for the GRU layers, the number of GRU layers, the embedding-size, etc. Does it improve the translations?
# * Use hyper-parameter optimization from Tutorial #19 to automatically find the best hyper-parameters.
# * When translating texts, instead of using `np.argmax()` to sample the next integer-token, could you sample the decoder's output as if it was a probability distribution instead? Note that the decoder's output is not softmax-limited so you have to do that first to turn it into a probability-distribution.
# * Can you generate multiple sequences by doing this sampling? Can you find a way to select the best of these different sequences?
# * Disable the reversal of words for the source-language. Does it improve the translations?
# * What is a Bi-Directional GRU and can you use it here?
# * We use the **output** of the encoder's GRU as the initial state of the decoder's GRU. The research literature often uses an LSTM instead of the GRU, so they used the encoder's **state** instead of its output as the initial state of the decoder. Can you rewrite this code to use the encoder's state as the decoder's initial state? Is there a reason to do this, or is the encoder's output sufficient to use as the decoder's initial state?
# * Is it possible to connect multiple encoders and decoders in a single neural network, so that you can train it on different languages and allow for direct translation e.g. from Danish to Polish, German and French?
# * Explain to a friend how the program works.

# ## License (MIT)
#
# Copyright (c) 2018 by [Magnus Erik Hvass Pedersen](http://www.hvass-labs.org/)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
