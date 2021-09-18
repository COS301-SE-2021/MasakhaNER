import Footer from "../../components/Footer/Footer";
import Nav from "../../components/nav/Nav";
import "./About.css";

export default function About() {
  return (
    <div className="abt">
      <Nav />
      <div className="about">
        <div className="out">
          <div className="vision_mission">
            <h4>Our Vision and Mission</h4>
            <p>
              Our mission is to strengthhen and spur NLP research in African
              languages, for Africans, by Africans. Des[ite the fact that 2000
              of the worlds languages are African, African are barely
              represented in technology.This has resulted in technological space
              that does not understand African names, cultures, places or
              history. Our vision is for Africans to shape and own these
              technological advances towards human dignity, well-being and
              equity, through inclusive community building, open participatory
              research and multidisciplinarity.
            </p>
          </div>
          <div className="tool">
            <h4>Masakhane NER Tool</h4>
            <p>
              The MasakhanaNER Tool is a named entity recognition tool
              specifically for African languages. Named entity recognition (NER)
              is a core NLP task in information extraction and NER systems are a
              requirement for numerous products from spell-checkers to
              localization of voice and dialogue systems, conversational agents,
              and that need to identify African names, places and people for
              information retrieval. We hope the approaches employed in this
              project can allow easy development of African language models
              available on HuggingFace, and generic enough to support other
              tasks like Machine translation and automatic diacritics
              restoration (e.g for Venda and Yoruba).
            </p>
          </div>
          <div className="owners">
            <h4>Project Owners</h4>
            <p>
              The project owners are David Adelani, Masakhane of the{" "}
              <a href="https://www.masakhane.io/">Masakhana orginasation</a> and
              Abiodun Modupe, Vukosi Marivate of{" "}
              <a href="https://dsfsi.github.io/">DSFSI-UP</a>. The{" "}
              <a href="https://github.com/COS301-SE-2021/MasakhaNER">
                StopDaCap
              </a>{" "}
              group is handling the project development. The{" "}
              <a href="https://github.com/COS301-SE-2021/MasakhaNER">
                StopDaCap
              </a>{" "}
              team consists of hard working computer science students who are
              doing thier final year at the{" "}
              <a href="https://www.up.ac.za/">Unversity of Pretoria(Tuks)</a>.
              They are skilled problem solvers, driven, self motivated,
              consistent and do thier very best to get the task done in time and
              with complete dedication and diligence. They are adaptive and good
              at improving their skills and understanding new concepts. Time
              management, planning and organizing tasks are other key aspects of
              the team. They plan to deliver a product that is quality,
              exceptional, secure, user-friendly and one that will meet the
              needs of the users.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
