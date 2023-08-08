from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from models.url import URLModel
from utils.fs import FileSystem
from utils.engine import PPGEngine
import os


app = FastAPI()
app.add_middleware(GZipMiddleware, minimum_size=512)

#allow from * for now
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
fs = FileSystem()


@app.get("/")
def read_root():
    return JSONResponse(status_code=200, content={"message": "bridge is Running"})

@app.post("/build_url")
def build_url(model: URLModel):
    app_name = model.appName.replace(" ", "")
    desktop_path = fs.get_desktop_path()
    template_path = fs.get_project_template_path()
    output_path = os.path.join(desktop_path, app_name)

    # check if exists in desktop folder named app_name
    if fs.exists(os.path.join(desktop_path, app_name)):
        return JSONResponse(status_code=400, content={"message": "app already exists"})

    # create folder in desktop
    engine = PPGEngine(dict(model), template_path, output_path, True)
    engine.copy_with_filtering()
    result = engine.compile_app() # returns (bool, str)

    if result[0] is False:
        return JSONResponse(status_code=400, content={"message": result[1]})

    output_path = output_path.replace("\\", "/")
    return JSONResponse(status_code=200, content={"message": f"App ported successfully in {output_path}"})
