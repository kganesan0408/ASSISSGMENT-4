alert("JavaScript is connected!");


const customName = document.querySelector("#customname");
const generateBtn = document.querySelector(".randomize");
const storyOutput = document.querySelector(".story");


function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


const storyTemplate = `It was :temp: outside, so :character: went to :place:. There, they :event:. Bob saw it all but wasn’t surprised — :character: weighs :weight:.`;


const data = {
    characters: ["A dragon", "An astronaut", "A pirate"],
    places: ["the moon", "a jungle", "a castle"],
    events: ["found a treasure", "started dancing", "disappeared"],
    weight: { us: "300 pounds", uk: Math.round(300 * 0.071429) + " stone" },
    temp: { us: "94 fahrenheit", uk: Math.round((94 - 32) * 5/9) + " centigrade" }
};


function generateStory() {
    let story = storyTemplate;

    
    story = story.replaceAll(":character:", getRandom(data.characters))
                 .replace(":place:", getRandom(data.places))
                 .replace(":event:", getRandom(data.events));

    if (customName.value.trim()) {
        story = story.replace("Bob", customName.value.trim());
    }

  
    const isUK = document.querySelector("#uk").checked;
    story = story.replace(":weight:", isUK ? data.weight.uk : data.weight.us)
                 .replace(":temp:", isUK ? data.temp.uk : data.temp.us);

    
    storyOutput.textContent = story;
    storyOutput.style.visibility = "visible"; // Make sure the story is shown
}


generateBtn.addEventListener("click", generateStory);
