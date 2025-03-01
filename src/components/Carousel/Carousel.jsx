import React, { useEffect, useState } from "react";
import axios from "axios";
import KColor from "../../KColor.png";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Slide } from "@mui/material";
import { Link } from "react-router-dom";
import "./Carousel.css";

const Carousel = ({ onDataPassed }) => {
  const [carouselData, setCarouselData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideIn, setSlideIn] = useState(true);

  // imageMappings object
  const imageMappings = {
    AFST: "https://media.istockphoto.com/id/1131949134/photo/wild-african-elephant-in-the-savannah-serengeti-national-park-wildlife-of-tanzania-african.jpg?s=2048x2048&w=is&k=20&c=N1FlmQtg9zR9DV9DW8qiS8eR8RyiCzmZPvUCIWpEhVo=",
    AMST: "https://media.istockphoto.com/id/1314505420/photo/the-flag-of-the-united-states-of-america-flying-in-front-of-the-capitol-building-blurred-in.jpg?s=2048x2048&w=is&k=20&c=4d_acF00RY72qNspYX0JwH6yCBaPl7werCYl5CQkbn4=",
    ANSO: "https://media.istockphoto.com/id/1280158646/vector/tiny-anthropologists-studying-neanderthal-skull.jpg?s=2048x2048&w=is&k=20&c=XQnTUMvreE4NciOBA6zKLPPYh-Z30HiW-sZ_lLiWD94=",
    ARBC: "https://media.istockphoto.com/id/1193013155/photo/ancient-arabic-letter-on-stone.jpg?s=2048x2048&w=is&k=20&c=0xV-YBq1F0IxfRuWC_hZQE5UXWtnR1lCjSrZC4JB7rQ=",
    ARTX: "https://media.istockphoto.com/id/1304289911/photo/my-vision-of-female-face.jpg?s=2048x2048&w=is&k=20&c=xYUGW0UkbXIYrpBbxiT-5u2yrEm19cWcMWLPBWEObrg=",
    BIOL: "https://media.istockphoto.com/id/1327569521/photo/science-of-plant-research-chromosome-dna-and-genetic-development-of-rice-varieties-scientist.jpg?s=2048x2048&w=is&k=20&c=ZDAl2fgfhVbW_E7_VoXkTqVEtZLPI5JiJ0X48zJSCWs=",
    CHIN: "https://media.istockphoto.com/id/899508826/photo/the-great-wall-of-china.jpg?s=2048x2048&w=is&k=20&c=a5GKqUOSRK6ByvRj4VDo-6nGsOraR8bnH1hUFWYOjf4=",
    COMP: "https://media.istockphoto.com/id/1295900106/photo/data-scientists-male-programmer-using-laptop-analyzing-and-developing-in-various-information.jpg?s=2048x2048&w=is&k=20&c=fBQm0fvR7I5s8xT-BhnSbhl8OoZJIi_Bqh7Whwrk95g=",
    CGHL: "https://media.istockphoto.com/id/1169605564/photo/the-concept-of-global-health-care.jpg?s=2048x2048&w=is&k=20&c=UN2nwcsqCmNbMLTUf995yKTb4DnPBUVfdmWlWldcjtQ=",
    CES: "https://media.istockphoto.com/id/1215705539/vector/hands-together-set-of-different-races-raised-up-hands-the-concept-of-education-business.jpg?s=2048x2048&w=is&k=20&c=SqflTyEfvs6eV7ob0iH--bgoVguJuMhFbmkX9U4Xv8Y=",
    EAST: "https://media.istockphoto.com/id/1215705539/vector/hands-together-set-of-different-races-raised-up-hands-the-concept-of-education-business.jpg?s=2048x2048&w=is&k=20&c=SqflTyEfvs6eV7ob0iH--bgoVguJuMhFbmkX9U4Xv8Y=",
    ECON: "https://media.istockphoto.com/id/1406742992/photo/businessman-draws-increase-arrow-graph-corporate-future-growth-year-2022-to-2023-planning.jpg?s=2048x2048&w=is&k=20&c=hzD4epyVhty_5pT7cTEuGtx5ct5NZ1ha_HnZyO8yyDg=",
    ENGL: "https://media.istockphoto.com/id/1047570732/vector/english.jpg?s=2048x2048&w=is&k=20&c=G5WLxRtiVqKGbd9AfN0PQXOD1DljBC0aAiX2_QPUHjo=",
    ENVS: "https://media.istockphoto.com/id/1577180772/photo/making-field-observations-of-a-river-and-coastline-with-a-clipboard-and-pen.jpg?s=2048x2048&w=is&k=20&c=Znp5n8E6i-KstamyvdRIT0eryL516G_mQe993pCN8IA=",
    FREN: "https://media.istockphoto.com/id/1185953092/photo/the-main-attraction-of-paris-and-all-of-europe-is-the-eiffel-tower-in-the-rays-of-the-setting.jpg?s=2048x2048&w=is&k=20&c=IfD0giUk7Zy7DVMsTblk-MSA3rp9o980Ga_Y9X4IsrM=",
    GERM: "https://media.istockphoto.com/id/1152163935/photo/reichstag-building-seat-of-the-german-parliament.jpg?s=1024x1024&w=is&k=20&c=1qbI_eI8t25ul2xlBoJCY4xNLrhlBWIueC4ndiLml_M=",
    HIST: "https://media.istockphoto.com/id/936911748/photo/old-hourglass-and-ancient-book.jpg?s=2048x2048&w=is&k=20&c=UgXz-GpOsXT4sa-w6-e29uEvKuD_gmnLilNAVKVhfGo=",
    IDSY: "https://media.istockphoto.com/id/1446301560/photo/modern-vehicle-with-ai-assisted-sensors-for-movement.jpg?s=1024x1024&w=is&k=20&c=IdupIuSEmVy68yt9vFGM6AdQMq3EbIW5W46UgsjlhdA=",
    IAST: "https://media.istockphoto.com/id/1169660398/photo/global-network-concept-map-of-japan-and-group-of-people.jpg?s=2048x2048&w=is&k=20&c=7SQHA7xFEqYEzMt-TyH1SoQ4mfCu59-CU9Zm5mO3cZE=",
    JAPN: "https://media.istockphoto.com/id/1192780580/photo/fuji-mountain-red-maple-tree-and-fisherman-boat-with-morning-mist-in-autumn-kawaguchiko-lake.jpg?s=2048x2048&w=is&k=20&c=RDvq89uJzRht7JvjFIGphSvt6IDXyuWbonydwpTHFlE=",
    HEBR: "https://media.istockphoto.com/id/149068908/photo/reading-the-torah.jpg?s=2048x2048&w=is&k=20&c=a6sTv_eJ5rIYm2Uw4rUoyZWKX0V9K44KIil5F23PteA=",
    LANG: "https://media.istockphoto.com/id/1337786250/vector/many-arms-raised-of-diverse-and-multi-ethnic-people-holding-speech-bubbles-with-text-hallo.jpg?s=2048x2048&w=is&k=20&c=S-X6SNUSJhJPhIy_L_xDoBGQeI-nBp0X6g_0fx4tcGU=",
    MATH: "https://media.istockphoto.com/id/953006834/photo/science-math-chemistry-equations.jpg?s=1024x1024&w=is&k=20&c=t35YcRlh35uO05qEHKEv4tbThQFpP41v76Yj9TmrI1w=",
    MUSC: "https://media.istockphoto.com/id/1076840920/vector/music-background.jpg?s=2048x2048&w=is&k=20&c=5EzAmZigbRR4v3nzNeAmX6WGdnvuBcNgVMDRY_E1uN8=",
    PHIL: "https://media.istockphoto.com/id/1324035318/vector/tree-brain-with-human-head-cape-idea-concept-of-thinking-hope-freedom-and-mind-surreal.jpg?s=2048x2048&w=is&k=20&c=EqUQ9TEssadgyI9WAswwWKEbrfFybot53RQxjh8mGLA=",
    PED: "https://media.istockphoto.com/id/1067774764/photo/it-all-starts-with-determination.jpg?s=2048x2048&w=is&k=20&c=prSiHe9YeNwgs0Hwu_jyqEi8oPxd4PWjYvzv1LgaYgc=",
    BUSN: "https://media.istockphoto.com/id/1311598658/photo/businessman-trading-online-stock-market-on-teblet-screen-digital-investment-concept.jpg?s=2048x2048&w=is&k=20&c=YSjDgQRHhi-kPn3GpowGFLPB8jEJN8SFrp2rpBFUD58=",
    SEMN: "https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=2048x2048&w=is&k=20&c=AnQo9q4GNFpisjRJKVnowsTWGyKUwdDwBIgZmxe-ET4=",
    RELG: "https://media.istockphoto.com/id/1401203567/photo/silhouette-of-two-people-hands-reaching-to-each-other-for-help-in-sunset-sky-and-orange-sun.jpg?s=2048x2048&w=is&k=20&c=UQ-TbTy5Z4Ewc-UnPjXVnFmA593yk1TZmf9du3c-aHA=",
    SPAN: "https://media.istockphoto.com/id/509288876/photo/tossa-de-mar-on-the-costa-brava-catalunya-spain.jpg?s=2048x2048&w=is&k=20&c=-Wsv60yor9scYTx-dCnYLrL0eKkEi2HIEMJv5JoXplA=",
    THEA: "https://media.istockphoto.com/id/115999740/photo/classical-theatre.jpg?s=2048x2048&w=is&k=20&c=zf2R8ZaDESivKks_SCtw9NlMFhYmJEJYYXjZPTRS1BA=",
    WGS: "https://media.istockphoto.com/id/1254992681/vector/a-strong-woman-protesting-against-domestic-violence-and-female-abuse.jpg?s=2048x2048&w=is&k=20&c=Zkl_y6j0zCEbk3h0lL4x-T3oOWXV7qHTEEdIG4qUOks=",
    PSYC: "https://media.istockphoto.com/id/1294477039/vector/metaphor-bipolar-disorder-mind-mental-double-face-split-personality-concept-mood-disorder-2.jpg?s=2048x2048&w=is&k=20&c=TFR3C5BXdwXjF7TtG4olJuJPCYtHhx6Rj83fJ97bZS4=",
    LATN: "https://media.istockphoto.com/id/956606482/photo/open-book.jpg?s=2048x2048&w=is&k=20&c=wjNZyFu8bCcPUpt7PEdc6YPx5uDu0XxUtLHnCopKaWM=",
    CHEM: "https://media.istockphoto.com/id/1387118000/photo/researcher-working-whit-fluids-in-flasks-in-the-chemical-laboratory.jpg?s=2048x2048&w=is&k=20&c=ntqFm5awxnBoBU-zB3z0BWRG2d6bGejztRbxY2YEwEo=",
    POLS: "https://media.istockphoto.com/id/509170745/photo/national-capitol-building.jpg?s=2048x2048&w=is&k=20&c=Awjidqr4EE2e_U1ruPMcpwxxh1Q7brHEuLCP9_Pver4=",
    CLAS: "https://media.istockphoto.com/id/176955067/photo/candlelit-classics.jpg?s=2048x2048&w=is&k=20&c=7RvMt3Hj9Cx1YtqPMYrR_7jo7hrE2k5X11ipkU4T7AA=",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://hhqv2backend.vercel.app/api/course"
        );
        const validTerms = ["2023WI", "2023SP"]; // Terms to include

        // Filter each course's offerings to include only those in valid terms
        const filteredData = response.data
          .map((course) => {
            return {
              ...course,
              offering: course.offering.filter((offering) =>
                validTerms.includes(offering.term_id)
              ),
            };
          })
          .filter((course) => course.offering.length > 0); // Keep only courses with valid offerings

        setCarouselData(filteredData);
      } catch (error) {
        console.error("Error fetching carousel data:", error);
      }
    };

    fetchData();
  }, []);

  const changeSlide = (newSlide) => {
    setSlideIn(false);
    setTimeout(() => {
      setCurrentSlide(newSlide);
      setSlideIn(true);
    }, 500);
  };

  const handleNext = () => {
    changeSlide(currentSlide < carouselData.length - 1 ? currentSlide + 1 : 0);
  };

  const handlePrev = () => {
    changeSlide(currentSlide > 0 ? currentSlide - 1 : carouselData.length - 1);
  };

  const handleAdd = () => {
    const data = carouselData[currentSlide].course_id;
    onDataPassed(data);
  };

  useEffect(() => {
    const intervalId = setInterval(handleNext, 5000);
    return () => clearInterval(intervalId);
  }, [currentSlide, carouselData.length]);

  if (!carouselData.length) {
    return <div>Loading...</div>;
  }

  const courseType = carouselData[currentSlide].course_id.split("-")[0];
  const imageUrl = imageMappings[courseType] || KColor; // Default image if not found in mappings

  return (
    <div className="carousel">
      <Slide direction="left" in={slideIn} mountOnEnter unmountOnExit>
        <div className="slide">
          <img
            src={imageUrl}
            className="carousel-image"
            alt="Carousel"
            style={
              imageUrl === KColor
                ? { width: "290px", height: "300px" }
                : { width: 500, height: 300 }
            }
          />

          <div className="info-container">
            <h1 className="carousel-top">
              {carouselData[currentSlide].course_id +
                ": " +
                carouselData[currentSlide].title}
            </h1>
            <ul className="carousel-top">
              {[
                ...new Set(
                  carouselData[currentSlide].offering.map(
                    (offering) => offering.faculty_name
                  )
                ),
              ].map((facultyName, index) => (
                <li key={index}>
                  {facultyName}
                  <br />
                  {carouselData[currentSlide].offering.find(
                    (o) => o.faculty_name === facultyName
                  ).term_id +
                    " - Section " +
                    carouselData[currentSlide].offering.find(
                      (o) => o.faculty_name === facultyName
                    ).section_number}
                </li>
              ))}
            </ul>
            <Link
              to={`/course-detail/${carouselData[currentSlide].course_id}`}
              className="carousel-top"
            >
              Learn more
            </Link>
          </div>
        </div>
      </Slide>
      <button className="left-click slide-controller" onClick={handlePrev}>
        <BsChevronLeft className="left-icon" />
      </button>
      <button className="right-click slide-controller" onClick={handleNext}>
        <BsChevronRight />
      </button>
      <button className="add" onClick={handleAdd}>
        Quick add
      </button>
    </div>
  );
};

export default Carousel;
