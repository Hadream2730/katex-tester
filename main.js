$(function () {
    var gpt_4_1_item = null;
    var gpt_5_1_item = null;
    $('#problem-number').val('1523');

    // Helper function to protect LaTeX before markdown processing
    function protectLatex(text) {
      if (!text) return { text: '', latexBlocks: [] };
      
      const latexBlocks = [];
      let counter = 0;
      
      // Protect $$ blocks first (display math)
      text = text.replace(/\$\$([\s\S]*?)\$\$/g, (match) => {
        const placeholder = `__LATEX_DISPLAY_${counter}_PLACEHOLDER__`;
        latexBlocks.push({ content: match });
        counter++;
        return placeholder;
      });
      
      // Protect \[ \] blocks (display math)
      text = text.replace(/\\\[([\s\S]*?)\\\]/g, (match) => {
        const placeholder = `__LATEX_DISPLAY_${counter}_PLACEHOLDER__`;
        latexBlocks.push({ content: match });
        counter++;
        return placeholder;
      });
      
      // Protect \( \) blocks (inline math)
      text = text.replace(/\\\(([\s\S]*?)\\\)/g, (match) => {
        const placeholder = `__LATEX_INLINE_${counter}_PLACEHOLDER__`;
        latexBlocks.push({ content: match });
        counter++;
        return placeholder;
      });
      
      // Protect $ blocks (inline math) - must be last, after $$ is protected
      text = text.replace(/\$([^\$\n]+?)\$/g, (match) => {
        if (match.includes('__LATEX_')) return match;
        const placeholder = `__LATEX_INLINE_${counter}_PLACEHOLDER__`;
        latexBlocks.push({ content: match });
        counter++;
        return placeholder;
      });
      
      return { text, latexBlocks };
    }
    
    // Helper function to restore LaTeX after markdown processing
    function restoreLatex(html, latexBlocks) {
      if (!html || !latexBlocks || latexBlocks.length === 0) return html;
      let result = html;
      latexBlocks.forEach((block, index) => {
        // Try both with and without underscores (marked.js might preserve them differently than markdown-it)
        const displayPatterns = [`LATEX_DISPLAY_${index}_PLACEHOLDER__`, `LATEX_DISPLAY_${index}_PLACEHOLDER`];
        const inlinePatterns = [`__LATEX_INLINE_${index}_PLACEHOLDER__`, `LATEX_INLINE_${index}_PLACEHOLDER`];
        
        displayPatterns.forEach(pattern => {
          result = result.replace(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), block.content);
        });
        inlinePatterns.forEach(pattern => {
          result = result.replace(new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), block.content);
        });
      });
      return result;
    }

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
  $('#prev-button').click(function () {
      showPrevious();
  });
  $('#next-button').click(function () {
      showNext();
  });
  $('#problem-number').on('keypress', function (e) {
      if (e.which === 13) { // Enter key pressed
          displayAll();
      }
  });
  function showNext() {
    const problem_number = $('#problem-number').val();
    let next_problem_number = 0;
    for(let i=0; i < gpt_4_1_data.length; i++) {
        if(gpt_4_1_data[i].index == problem_number) {
            if(i == gpt_4_1_data.length - 1) {
                next_problem_number = gpt_4_1_data[0].index;
                break;
            }
            next_problem_number =  gpt_4_1_data[i+1].index;
            break;
        }
    }
    $('#problem-number').val(next_problem_number);
    displayAll(next_problem_number);
  }
  function showPrevious() {
    const problem_number = $('#problem-number').val();
    let previous_problem_number = 0;
    for(let i=0; i < gpt_4_1_data.length; i++) {
        if(gpt_4_1_data[i].index == problem_number) {
            if(i == 0) {
                previous_problem_number = gpt_4_1_data[gpt_4_1_data.length - 1].index;
                break;
            }
            previous_problem_number =  gpt_4_1_data[i-1].index;
            break;
        }
    }
    $('#problem-number').val(previous_problem_number);
    displayAll(previous_problem_number);
}
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
    const { text: protectedText, latexBlocks } = protectLatex(gpt_4_1_item.problem);
    const markdownHtml = typeof marked !== 'undefined' ? marked.parse(protectedText) : protectedText;
    outputDiv.innerHTML = restoreLatex(markdownHtml, latexBlocks);
    
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
    const { text: protectedText, latexBlocks } = protectLatex(gpt_4_1_item.solution);
    const markdownHtml = typeof marked !== 'undefined' ? marked.parse(protectedText) : protectedText;
    outputDiv.innerHTML = restoreLatex(markdownHtml, latexBlocks);
    
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
    // Answer is already wrapped in $ delimiters, so protect it
    const answerText = "$" + gpt_4_1_item.answers + "$";
    const { text: protectedText, latexBlocks } = protectLatex(answerText);
    // Answer might not need markdown, but apply it anyway for consistency
    const markdownHtml = typeof marked !== 'undefined' ? marked.parse(protectedText) : protectedText;
    outputDiv.innerHTML = restoreLatex(markdownHtml, latexBlocks);
    
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
    const { text: protectedText, latexBlocks } = protectLatex(gpt_4_1_item.completion);
    const markdownHtml = typeof marked !== 'undefined' ? marked.parse(protectedText) : protectedText;
    outputDiv.innerHTML = restoreLatex(markdownHtml, latexBlocks);
    
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
    const { text: protectedText, latexBlocks } = protectLatex(gpt_5_1_item.completion);
    const markdownHtml = typeof marked !== 'undefined' ? marked.parse(protectedText) : protectedText;
    outputDiv.innerHTML = restoreLatex(markdownHtml, latexBlocks);
    
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