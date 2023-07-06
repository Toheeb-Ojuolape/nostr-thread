interface ContentProps {
  content: string;
}

function Content({ content }: ContentProps) {
  const isImageLink = (text: string) => {
    // Regular expression to check if the text is a valid image link
    const regex = /\.(gif|jpe?g|tiff?|png|webp|bmp|https?:\/\/tenor\.com\/.+\.gif)$/i;

    return regex.test(text)
  };

    

  const isYoutubeLink = (text:string) =>{
    // Regular expression to check if the text is a valid YouTube video link
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/i;
    return youtubeRegex.test(text)
  }

  const splitContent = (content: string) => {
    // Split the content by whitespace to identify individual words/links
    return content.split(/\s+/);
  };

  const renderContent = () => {
    const words = splitContent(content);
    const renderedContent: JSX.Element[] = [];

    words.forEach((word:any, index) => {
        if (isYoutubeLink(word)){
          // If the word is a YouTube video link, embed it as an iframe
          const videoId = word.match(/([a-zA-Z0-9_-]{11})$/i)[0];
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;

          renderedContent.push(
            <div key={index} className="video-embed">
              <iframe
                width={"100%"}
                src={embedUrl}
                title="YouTube Video"
                allowFullScreen
                height={"300px"}
              ></iframe>
            </div>
          );
        } else if(isImageLink(word)) {
          // If the word is an image link, wrap it in an <img> tag
          renderedContent.push(
            <img
              onClick={() => window.open(word, "_blank")}
              key={index}
              src={word}
              alt="Image"
              style={{
                cursor: "pointer",
                width: "100%",
                maxWidth:"500px",
                objectFit: "cover",
                margin: "5px 0px",
              }}
            />
          );
        }
      else {
        // Otherwise, render the word as plain text
        renderedContent.push(
          <span className="nostr-text" key={index}>
            {word}{" "}
          </span>
        );
      }
    });

    return renderedContent;
  };

  return <div>{renderContent()}</div>;
}

export default Content;
