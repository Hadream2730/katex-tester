$(function () {
    var gpt_4_1_item = null;
    var gpt_5_1_item = null;
    $('#problem-number').val('1523');

    function displayAll(){
        const problem_number = $('#problem-number').val();
        console.log('Problem Number:', problem_number);
        gpt_4_1_item = get_gpt_4_1_from_index(problem_number);
        gpt_5_1_item = get_gpt_5_1_from_index(problem_number);
        console.log('GPT-4.1 Item:', gpt_4_1_item);
        console.log('GPT-5.1 Item:', gpt_5_1_item);
        display_problem();
        display_solution();
        display_answer();
        display_model1_output();
        display_model2_output();

    }
  $('#display-button').click(function () {
      displayAll();
  });
  $('#problem-number').on('keypress', function (e) {
      if (e.which === 13) { // Enter key pressed
          displayAll();
      }
  });
  function get_gpt_4_1_from_index(index) {
    for(let i=0; i < gpt_4_1_data.length; i++) {
        if(gpt_4_1_data[i].index == index) {
            return gpt_4_1_data[i]
        }
    }
  }
  function get_gpt_5_1_from_index(index) {
    for(let i=0; i < gpt_5_1_data.length; i++) {
        if(gpt_5_1_data[i].index == index) {
            return gpt_5_1_data[i]
        }
    }
  }
  function display_problem() {
    let outputDiv = document.getElementById('problem-display');
    outputDiv.innerHTML = gpt_4_1_item.problem;
    
    // Add the text to be rendered
    // const textNode = document.createTextNode(text);
    // outputDiv.appendChild(textNode);
    
    // Render the KaTeX
    try {
        renderMathInElement(outputDiv, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false},
                {left: "\\[", right: "\\]", display: true},
                {left: "\\begin{equation}", right: "\\end{equation}", display: true},
                {left: "\\begin{align}", right: "\\end{align}", display: true},
                {left: "\\begin{alignat}", right: "\\end{alignat}", display: true},
                {left: "\\begin{gather}", right: "\\end{gather}", display: true},
                {left: "\\begin{CD}", right: "\\end{CD}", display: true}
            ],
            throwOnError: false,
            strict: false
        });
    } catch (error) {
        outputDiv.innerHTML = '<div style="color: red;">Error rendering KaTeX: ' + error.message + '</div>';
    }
  }

  
  function display_solution() {
    let outputDiv = document.getElementById('solution-display');
    outputDiv.innerHTML = gpt_4_1_item.solution;
    
    // Add the text to be rendered
    // const textNode = document.createTextNode(text);
    // outputDiv.appendChild(textNode);
    
    // Render the KaTeX
    try {
        renderMathInElement(outputDiv, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false},
                {left: "\\[", right: "\\]", display: true},
                {left: "\\begin{equation}", right: "\\end{equation}", display: true},
                {left: "\\begin{align}", right: "\\end{align}", display: true},
                {left: "\\begin{alignat}", right: "\\end{alignat}", display: true},
                {left: "\\begin{gather}", right: "\\end{gather}", display: true},
                {left: "\\begin{CD}", right: "\\end{CD}", display: true}
            ],
            throwOnError: false,
            strict: false
        });
    } catch (error) {
        outputDiv.innerHTML = '<div style="color: red;">Error rendering KaTeX: ' + error.message + '</div>';
    }
  }

  
  function display_answer() {
    let outputDiv = document.getElementById('answer-display');
    outputDiv.innerHTML = "$" + gpt_4_1_item.answers + "$";
    
    // Add the text to be rendered
    // const textNode = document.createTextNode(text);
    // outputDiv.appendChild(textNode);
    
    // Render the KaTeX
    try {
        renderMathInElement(outputDiv, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false},
                {left: "\\[", right: "\\]", display: true},
                {left: "\\begin{equation}", right: "\\end{equation}", display: true},
                {left: "\\begin{align}", right: "\\end{align}", display: true},
                {left: "\\begin{alignat}", right: "\\end{alignat}", display: true},
                {left: "\\begin{gather}", right: "\\end{gather}", display: true},
                {left: "\\begin{CD}", right: "\\end{CD}", display: true}
            ],
            throwOnError: false,
            strict: false
        });
    } catch (error) {
        outputDiv.innerHTML = '<div style="color: red;">Error rendering KaTeX: ' + error.message + '</div>';
    }
  }

  
  function display_model1_output() {
    let outputDiv = document.getElementById('model1-display');
    outputDiv.innerHTML = gpt_4_1_item.completion;
    
    // Add the text to be rendered
    // const textNode = document.createTextNode(text);
    // outputDiv.appendChild(textNode);
    
    // Render the KaTeX
    try {
        renderMathInElement(outputDiv, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false},
                {left: "\\[", right: "\\]", display: true},
                {left: "\\begin{equation}", right: "\\end{equation}", display: true},
                {left: "\\begin{align}", right: "\\end{align}", display: true},
                {left: "\\begin{alignat}", right: "\\end{alignat}", display: true},
                {left: "\\begin{gather}", right: "\\end{gather}", display: true},
                {left: "\\begin{CD}", right: "\\end{CD}", display: true}
            ],
            throwOnError: false,
            strict: false
        });
    } catch (error) {
        outputDiv.innerHTML = '<div style="color: red;">Error rendering KaTeX: ' + error.message + '</div>';
    }
  }
  
  function display_model2_output() {
    let outputDiv = document.getElementById('model2-display');
    outputDiv.innerHTML = gpt_5_1_item.completion;
    
    // Add the text to be rendered
    // const textNode = document.createTextNode(text);
    // outputDiv.appendChild(textNode);
    
    // Render the KaTeX
    try {
        renderMathInElement(outputDiv, {
            delimiters: [
                {left: "$$", right: "$$", display: true},
                {left: "$", right: "$", display: false},
                {left: "\\(", right: "\\)", display: false},
                {left: "\\[", right: "\\]", display: true},
                {left: "\\begin{equation}", right: "\\end{equation}", display: true},
                {left: "\\begin{align}", right: "\\end{align}", display: true},
                {left: "\\begin{alignat}", right: "\\end{alignat}", display: true},
                {left: "\\begin{gather}", right: "\\end{gather}", display: true},
                {left: "\\begin{CD}", right: "\\end{CD}", display: true}
            ],
            throwOnError: false,
            strict: false
        });
    } catch (error) {
        outputDiv.innerHTML = '<div style="color: red;">Error rendering KaTeX: ' + error.message + '</div>';
    }
  }
});