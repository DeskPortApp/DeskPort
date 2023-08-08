import PortAppLayout from "../../layouts/PortAppLayout";
import axios from "axios";

const PortApps = () => {
  const build_app = (data) => {
    const appName = data.appName.trim() || "My App";
    const appVersion = data.appVersion.trim() || "1.0.0";
    const author = data.author.trim().toLowerCase();
    const sanitizedAppName = appName.toLowerCase().replace(/\s/g, "");

    if (
      data.macBundle.trim() === "" ||
      !data.macBundle.match(/^[a-z][a-z0-9]*(\.[a-z0-9]+)+[0-9a-z]$/)
    ) {
      data.macBundle = `com.${author}.${sanitizedAppName || "myapp"}`;
    }

    // update data with sanitized values
    data = {
      ...data,
      appName,
      appVersion,
      author,
    };

    // if appUrl is not empty string, show a message
    if (data.appUrl.trim()) {
      axios.post("http://localhost:14935/build_url", data).then((res) => {
        
        if(res.status === 200){
          alert(res.data.message);
        }
      }).catch((err) => {
        alert(err.response.data.message);
      })
    }
  };

  return (
    <>
      <PortAppLayout action={build_app} />
    </>
  );
};

export default PortApps;
