import { useState } from "react";

const PortAppLayout = ({ action }) => {
  const [data, setData] = useState({
    appName: "",
    appVersion: "",
    macBundle: "",
    author: "",
    binding: "",
    appUrl: "",
    appIcon: "",
    sourceCode: "",
    nsis: false,
  });

  const [error, setError] = useState({
    active: false,
    message: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      appName,
      appVersion,
      author,
      binding,
      appIcon,
      sourceCode,
      appUrl,
      macBundle,
    } = data;

    if (!appName.trim()) {
      setData((prev) => ({ ...prev, appName: "My App" }));
    }

    // validate that all required fields are filled
    if (
      !author.trim() ||
      !binding.trim() ||
      !appIcon.trim() ||
      binding === "Select a binding"
    ) {
      setError({ active: true, message: "Please fill all required fields!" });
      return;
    }

    // check icon minimum size (1024x1024)
    const img = new Image();
    img.src = appIcon;
    img.onload = () => {
      if (img.width < 512 || img.height < 512) {
        setError({
          active: true,
          message: "Icon must be at least 1024x1024 pixels!",
        });
        return;
      }
    };

    // if sourceCode and appUrl are empty strings, show an error
    if (!sourceCode.trim() && !appUrl.trim()) {
      setError({
        active: true,
        message: "Please provide either a source code or an app URL!",
      });
      return;
    }

    // if appVersion is an empty string, set it to "1.0.0"; otherwise, check that it's a valid version number (x.x.x)
    if (!appVersion.trim()) {
      setData({ ...data, appVersion: "1.0.0" });
    }

    // if macBundle is an empty string or not a valid bundle identifier, set it to com.you.appName
    if (
      !macBundle.trim() ||
      !macBundle.match(/^[a-z][a-z0-9]*(\.[a-z0-9]+)+[0-9a-z]$/)
    ) {
      setData({
        ...data,
        macBundle: `com.${author.toLowerCase()}.${
          appName.toLowerCase().trim().replace(/\s/g, "") || "myapp"
        }`,
      });
    }

	// if sourceCode and appUrl are not empty strings, show an error
	if (sourceCode.trim() && appUrl.trim()) {
		setError({
			active: true,
			message: "Please provide either a source code or an app URL, not both!",
		});
		return;
	}

    action(data);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    // only accept png files
    if (file.type !== "image/png") {
      alert("Only PNG files are accepted!");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setData({ ...data, [e.target.name]: reader.result });
    };
  };

  const handleZipUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setData({ ...data, [e.target.name]: reader.result });
    };
  };

  return (
    <div className="h-screen flex flex-col">
      {error.active && (
        <div
          className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3 w-1/4 ml-auto rounded-s-xl mt-5 animate__animated animate__fadeInRight"
          role="alert"
        >
          <p className="font-bold">Error: </p>
          <p className="text-sm">{error.message}</p>
          <span
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError({ active: false, message: "" })}
          >
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      <div className="bg-neutral-800 rounded-xl p-8 m-auto dark w-1/2 ms:w-3/4 lg:w-1/2 xl:w-2/6">
        <h1 className="text-3xl text-white pb-4 font-medium">
          Port{" "}
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
            ({data.appName === "" ? "My App" : data.appName})
          </span>
        </h1>
        <hr className="pt-6" />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="appName" className="form-label">
              App Name
            </label>
            <input
              type="text"
              className="form-control"
              id="appName"
              placeholder="My App"
              name="appName"
              value={data.appName}
              onChange={handleChange}
              aria-describedby="appNameHelp"
            />
            <div id="appNameHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="appVersion" className="form-label">
              Version
            </label>
            <input
              type="text"
              pattern="^\d+(\.\d+)*$"
              className="form-control"
              placeholder="1.0.0"
              name="appVersion"
              value={data.appVersion}
              onChange={handleChange}
              id="appVersion"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="macBundle" className="form-label">
              Mac bundle identifier (optional)
            </label>
            <input
              type="text"
              className="form-control"
              pattern="^\w+(\.\w+)*$"
              placeholder="com.you.myapp"
              name="macBundle"
              value={data.macBundle}
              onChange={handleChange}
              id="macBundle"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              Author
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="John Doe"
              id="author"
              name="author"
              value={data.author}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="binding" className="form-label">
              Qt binding
            </label>
            <select
              className="form-select"
              aria-label="Binding selector"
              name="binding"
              value={data.binding}
              onChange={handleChange}
            >
              <option defaultValue>Select a binding</option>
              <option value="PySide6">PySide6 (6.4)</option>
              <option value="PyQt6">PyQt6</option>
              <option value="PyQt5">PyQt5</option>
              <option value="PyQt5">PySide2</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="appUrl" className="form-label">
              App URL (optional)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="https://example.com"
              id="appUrl"
              name="appUrl"
              value={data.appUrl}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="input-group-text" htmlFor="appIcon">
              App Icon
            </label>
            <input
              type="file"
              className="form-control"
              id="appIcon"
              name="appIcon"
              onChange={handleImageUpload}
              accept=".png"
            />
          </div>
          <div className="mb-3">
            <label className="input-group-text" htmlFor="sourceCode">
              Source Code (HTML, CSS, JS) (optional)
            </label>
            <input
              type="file"
              className="form-control"
              id="sourceCode"
              name="sourceCode"
              accept=".zip"
              onChange={handleZipUpload}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              name="nsis"
              value={data.nsis}
              onChange={(e) =>
                setData({ ...data, [e.target.name]: e.target.checked })
              }
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Create NSIS installer (Windows)
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PortAppLayout;
