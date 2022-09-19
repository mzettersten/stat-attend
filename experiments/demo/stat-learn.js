/**
 * jsPsych 4-arm statistical learning task
 *
 * Martin Zettersten
 *
 * documentation: docs.jspsych.org
 *
 */

jsPsych.plugins['stat-learn'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('stat-learn', 'stimuli', 'image');

  plugin.info = {
    name: 'stat-learn',
    description: '',
    parameters: {
      stimuli: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimuli',
        default: undefined,
        array: true,
        description: 'A stimulus is a path to an image file.'
      },
      canvas_size: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Canvas size',
        array: true,
        default: [850,850],
        description: 'Array specifying the width and height of the area that the animation will display in.'
      },
      image_size: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Image size',
        array: true,
        default: [175,175],
        description: 'Array specifying the width and height of the images to show.'
      },
      instruction: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Instruction',
        array: false,
        default: "",
        description: 'instruction shown to participant'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: 750,
        description: 'The maximum duration to wait for a response.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {
    
    // variable to keep track of timing info and responses
    var start_time = 0;
    var responses = [];
 	 var rt = "NA";
  	var end_time = "NA";
    
  var trial_data={};

    // start timer for this trial
    start_time = performance.now();
	
    display_element.innerHTML = "<svg id='jspsych-test-canvas' width=" + trial.canvas_size[0] + " height=" + trial.canvas_size[1] + "></svg>";

    var paper = Snap("#jspsych-test-canvas");
	
  var rect1 = paper.rect(25, 300, 225,225,10);
  rect1.attr({
	  fill: "#ffffff",
	  stroke: "#000",
	  strokeWidth: 5
  });
  
  var rect2 = paper.rect(300, 25, 225,225,10);
  rect2.attr({
	  fill: "#ffffff",
	  stroke: "#000",
	  strokeWidth: 5
  });
  
  var rect3 = paper.rect(575, 300, 225,225,10);
  rect3.attr({
	  fill: "#ffffff",
	  stroke: "#000",
	  strokeWidth: 5
  });
  
  var rect4 = paper.rect(300, 575, 225,225,10);
  rect4.attr({
	  fill: "#ffffff",
	  stroke: "#000",
	  strokeWidth: 5
  });
  
  var imageLocations = {
	  left: [50, 325],
	  top: [325, 50],
	  right: [600, 325],
	  bottom: [325, 600],
	  
  };

  var instruction = paper.text(400,95,trial.instruction);
  instruction.attr({
		  "text-anchor": "middle",		  
		  "font-weight": "bold",
		  "font-size": 20
	  });

  var fixation_image = paper.image("stimuli/fixation_cross.png", 162.5,162.5,500,500);
  
  var image1 = paper.image(trial.stimuli[0], imageLocations["left"][0], imageLocations["left"][1], trial.image_size[0],trial.image_size[1]);
  var image2 = paper.image(trial.stimuli[1], imageLocations["top"][0], imageLocations["top"][1], trial.image_size[0],trial.image_size[1]);
  var image3 = paper.image(trial.stimuli[2], imageLocations["right"][0], imageLocations["right"][1], trial.image_size[0],trial.image_size[1]);
  var image4 = paper.image(trial.stimuli[3], imageLocations["bottom"][0], imageLocations["bottom"][1], trial.image_size[0],trial.image_size[1]);

// end trial if time limit is set
      if (trial.trial_duration !== null) {
        jsPsych.pluginAPI.setTimeout(function () {
          endTrial();
        }, trial.trial_duration);
      }



    function endTrial() {

    	end_time = performance.now();
	  rt = end_time - start_time;
		

      display_element.innerHTML = '';

	  
      var trial_data = {
		//"label": trial.label,
		start_time: start_time,
		end_time: end_time,
		stimuli: trial.stimuli,
		image1: trial.stimuli[0],
		image2: trial.stimuli[1],
		image3: trial.stimuli[2],
		 image4: trial.stimuli[3],
		rt: rt
		
	};

      jsPsych.finishTrial(trial_data);
	  
    }
  };

  return plugin;
})();
