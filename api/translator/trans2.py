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
import IPython
import numpy as np
import tensorflow as tf
#from TokenizerWrap import TokenizerWrap
#get_ipython().run_line_magic('matplotlib', 'inline')


# print(device_lib.list_local_devices())


class Translate:

    tokenizer_src = None
    okenizer_dest = None
    token_start = None
    token_end = None
    model_encoder = None
    model_decoder = None

    def __init__(self):

        os.path.join(os.path.dirname(__file__), "token_src.pickle")
        with open(os.path.join(os.path.dirname(__file__), "token_src.pickle"), "rb") as f:
            self.tokenizer_src = pickle.load(f)

        os.path.join(os.path.dirname(__file__), "token_dest.pickle")
        with open(os.path.join(os.path.dirname(__file__), "token_dest.pickle"), "rb") as f:
            self.tokenizer_dest = pickle.load(f)

        mark_start = 'ssss '
        mark_end = ' eeee'
        self.token_start = self.tokenizer_dest.word_index[mark_start.strip()]
        self.token_end = self.tokenizer_dest.word_index[mark_end.strip()]
        print(os.path.join(os.path.dirname(__file__), "model_e2"))
        self.model_encoder = tf.keras.models.load_model(
            os.path.join(os.path.dirname(__file__), "model_e2"))

        print(self.model_encoder)
        self.model_decoder = tf.keras.models.load_model(
            os.path.join(os.path.dirname(__file__), "model_d2"))

    def translate(self, input_text, true_output_text=None):
        """Translate a single text-string."""

        input_tokens = self.tokenizer_src.text_to_tokens(text=input_text,
                                                         reverse=True,
                                                         padding=True)

        initial_state = self.model_encoder.predict(input_tokens)

        max_tokens = self.tokenizer_dest.max_tokens

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
        while token_int != self.token_end and count_tokens < max_tokens:
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
            decoder_output = self.model_decoder.predict(x_data)

            # Get the last predicted token as a one-hot encoded array.
            token_onehot = decoder_output[0, count_tokens, :]

            # Convert to an integer-token.
            token_int = np.argmax(token_onehot)

            # Lookup the word corresponding to this integer-token.
            sampled_word = self.tokenizer_dest.token_to_word(token_int)

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


# thing = Translate()


# # This is a text from a Danish song. It doesn't even make much sense in Danish. However the translation is probably so broken because several of the words are not in the vocabulary.

# print(thing.translate(input_text="The news that will interest you",
#                       true_output_text='how are you'))
