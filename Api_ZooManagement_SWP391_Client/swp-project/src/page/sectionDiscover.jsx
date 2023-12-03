import React,{useState} from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import {PiButterflyLight} from "react-icons/pi"
import {GiLion,GiMonkey,GiElephant} from "react-icons/gi"
import {FaHippo} from "react-icons/fa"




function SectionDiscover() {
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const animalData = [
    {
      name: 'Butterfly',
      image: '../../src/assets/img/buomEdit.jpg',
      category: 'Butterfly',
      items: [
        {
          name: 'Hedylidae',
          description: 'Small, brown, like geometrid moths; antennae not clubbed; long slim abdomen',
        },
        {
          name: 'Hesperiidae',
          description: 'Small, darting flight; clubs on antennae hooked backwards',
        },
        {
          name: 'Lycaenidae',
          description: 'Small, brightly coloured; often have false heads with eyespots and small tails resembling antennae',
        },
        {
          name: 'Nymphalidae',
          description: 'Usually have reduced forelegs, so appear four-legged; often brightly coloured',
        },
      ],
    },
    {
      name: 'Lion',
      image: '../../src/assets/img/sutuEdit.jpg',
      category: 'Lion',
      items: [
        {
          name: 'Asiatic lion',
          description: 'The male weighs between 160-190 kg, female weighs between 110-120 kg.',
        },
        {
          name: 'Barbary lion',
          description: 'According to records, its length (head to tail) varied between 7 feet 9 inches to 9 feet 2 inches.',
        },
        {
          name: 'West African lions',
          description: 'This species is believed to be less than 1000 overall, is considered to be among the most endangered species.',
        },
        {
          name: 'East African or Masai lion',
          description: 'They are between 8 to 10 feet tall. They have great tufts of manes, their manes look like combed backwards.',
        },
      ],
    },
    {
      name: 'Monkey',
      image: '../../src/assets/img/khiEdit.jpg',
      category: 'Monkey',
      items: [
        {
          name: 'Olive Baboon',
          description: 'These baboons also have powerful jaws and sharp canine teeth for eating a variety of plants and small animals.',
        },
        {
          name: 'Golden Snub-Nosed Monkey',
          description: 'The golden snub-nosed monkey is found in mountain forests at ranging from 1,600 to 4,000 meters above sea level. ',
        },
        {
          name: 'Pygmy Marmoset',
          description: 'pygmy marmosets weigh just 0.4 to 0.5 ounces at birth. Reach 3-5 ounces and 4.7-6.3 inches long by adulthood.',
        },
        {
          name: 'Mandrill',
          description: 'Males reach heights of about 31 inches, weigh up to 119 lbs, olive green bodies, and a red stripe down their muzzles.',
        },
      ],
    },
    {
      name: 'Hippo',
      image: '../../src/assets/img/hamaEdit.jpg',
      category: 'Hiipo',
      items: [
        {
          name: 'Hippopotamus Amphibius',
          description: 'They have stocky trunks and weigh between 1.5 and 3 tons. They have hairless skin that is gray or brownish red. The current population of the common hippopotamus is estimated at between 125,000 and 148,000 animals spread out in 29 sub-Saharan nations.',
        },
        {
          name: 'Pygmy Hippopotamus',
          description: 'They have stocky bodies, hairless gray or brownish skin, long sharp canines, and nocturnal tendencies. An adult pygmy hippo weighs between 397 lbs and 606 lbs. Pygmy hippos’ eyes and nostrils do not protrude from the head like those of common hippos.',
        },
        
      ],
    },
    {
      name: 'Elephant',
      image: '../../src/assets/img/voi.jpg',
      category: 'Elephant',
      items: [
        {
          name: 'Savannah/Bush Elephant',
          description: 'The bush elephant can weigh as much as 10.4 tons and grow 13 feet tall at the shoulders.',
        },
        {
          name: 'Sri Lankan Elephant',
          description: 'a shoulder height of 2 to 3.5 m, weight between 2,000 and 5,000 kg, and possess 19 pairs of ribs.',
        },
        {
          name: 'Indian Elephant',
          description: 'This type of elephant attains a shoulder height of 2 to 3.5 m, weigh between 4,000 and 5,000 kg.',
        },
        {
          name: 'Sumatran Elephant',
          description: 'These elephants grow to achieve shoulder height between 2 and 3.2 m, weigh between 2,000 and 4,000 kg.',
        },
      ],
    },
  ];

  const handleAnimalClick = (animal) => {
    setSelectedAnimal(animal);
  };

  return (
    <div>
      <section className="section-discover-menu" id="2">
        <div className="container">
          <div className="heading-two">
            <h2>Discover Species</h2>
            <div className="line"></div>
          </div>
          <div className="nav nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            {animalData.map((animal, index) => (
              <button
                key={index}
                className={`nav-link ${selectedAnimal === animal.name ? 'active' : ''}`}
                onClick={() => handleAnimalClick(animal.name)}
                id={`v-pills-${animal.name.toLowerCase()}-tab`}
                data-bs-toggle="pill"
                data-bs-target={`#v-pills-${animal.name.toLowerCase()}`}
                type="button"
                role="tab"
                aria-controls={`v-pills-${animal.name.toLowerCase()}`}
                aria-selected={selectedAnimal === animal.name ? 'true' : 'false'}
              >
                {animal.name === 'Butterfly' ? <PiButterflyLight /> : null}
                {animal.name === 'Lion' ? <GiLion /> : null}
                {animal.name === 'Monkey' ? <GiMonkey /> : null}
                {animal.name === 'Hippo' ? <FaHippo /> : null}
                {animal.name === 'Elephant' ? <GiElephant /> : null}
                {animal.name}
              </button>
            ))}
          </div>
          <div className="tab-content" id="v-pills-tabContent">
            {animalData.map((animal, index) => (
              <div
                key={index}
                className={`tab-pane fade show ${selectedAnimal === animal.name ? 'active' : ''}`}
                id={`v-pills-${animal.name.toLowerCase()}`}
                role="tabpanel"
                aria-labelledby={`v-pills-${animal.name.toLowerCase()}-tab`}
              >
                <div className="row align-items-center discover-menu">
                  <div className="col-xl-6">
                    <div className="discover-img">
                      <img alt={animal.name} src={animal.image} />
                    </div>
                  </div>
                  <div className="col-xl-5">
                    <div className="discover">
                      <h4>{animal.category}</h4>
                      <ul>
                        {animal.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            <div>
                              <h6>{item.name}</h6>
                              <p>{item.description}</p>
                            </div>
                            <span>{item.price}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SectionDiscover;
