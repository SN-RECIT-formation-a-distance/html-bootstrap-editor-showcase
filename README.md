# html-bootstrap-editor-showcase
Showcase templates for use with HTML Bootstrap editor.

Need to add both JSON file to en and fr folders for a new template

Example of a JSON template:
Main attribute: 
- id: unique ID for a template
- tags: Tags name
- name: Template name
- htmlstr: A string of HTML (replace " -> \", use \n for new line, use data-tag-id - data-...-id to allow content editor in showcase screen)
"<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css\" rel=\"stylesheet\" /> \n <section id=\"about-section\" class=\"pt-5 pb-5\">\n <div class=\"container wrapabout\">\n <div class=\"red\"></div>\n <div class=\"row\">\n <div class=\"col-lg-6 align-items-center justify-content-left d-flex mb-5 mb-lg-0\">\n <div class=\"blockabout\">\n <div class=\"blockabout-inner text-center text-sm-start\">\n <div class=\"title-big pb-3 mb-3\">\n <h3 data-tag-id=\"1\">ABOUT ME</h3>\n </div>\n <p class=\"description-p text-muted pe-0 pe-lg-0\" data-tag-id=\"2\">\n Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus quas optio reiciendis deleniti voluptatem facere sequi, quia, est sed dicta aliquid quidem facilis culpa iure perferendis? Dolor ad quia deserunt. </p>\n </div>\n </div>\n </div>\n </div>\n </div>\n </section>"
