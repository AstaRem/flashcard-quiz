import React, {useState, useEffect, useRef} from 'react';


export default function Flashcard({flashcard}) {
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState('initial')

    const frontEl = useRef()
    const backEl = useRef()

    function setMaxHeight(){
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, backHeight, 100));
    }

    //everytime question, answer or options change, we want to recalculate the height
    useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
    useEffect(() => {
        window.addEventListener('resize', setMaxHeight)
        return () => window.removeEventListener('resize', setMaxHeight) 
    }, [])

  return (     // just to set our current flip to not flip :-) . If the flip is true, return .answer from our flashcards example object , otherwise return .question. Here we are making relationship between flip value and object property. question and answer are not on the different sides of the card, they are just different properties of the same object. Our flipping logic is actually working :-)
    <div onClick={() => setFlip(!flip)} 
        className={`card ${flip ? 'flip' : ''}`} /* we will have class 'card' for every single card, but when the flip is true, the class will change - will be 'flip' class. It is a really good way to handle dynamic classes.*/
        style={{height: height}}
        > 
            
            <div className="front" ref={frontEl}>
                {flashcard.question}
                    <div className="flashcard-options"  //we display another property of our object:     .options 
                    >

                    {flashcard.options.map((option) => 
                       { return <div className="flashcard-option" key={option}> {option}</div>}
                    )}  
                    </div>
            </div>

            <div className="back" ref={backEl}>
                {flashcard.answer}
            </div>
          
        {/* {flip ? flashcard.answer : flashcard.question} */}
    </div>
  )
}
