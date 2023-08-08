import sys
import os
import requests
import uvicorn
from ppg_runtime.application_context.PySide6 import ApplicationContext, PPGLifeCycle
from PySide6.QtWidgets import QMainWindow
from PySide6.QtCore import QUrl, QRunnable, QThreadPool
from PySide6.QtWebEngineWidgets import QWebEngineView
from bridge import app

class ThreadWorker(QRunnable):
    def __init__(self, fn, *args, **kwargs):
        super(ThreadWorker, self).__init__()
        self.fn = fn
        self.args = args
        self.kwargs = kwargs

    def run(self):
        self.fn(*self.args, **self.kwargs)

class DeskPort(PPGLifeCycle, QMainWindow, ApplicationContext):

    def __run_webclient(self):
        os.system("cd " + self.get_resource("webclient") + " && yarn vite")

    def __bridge(self):
        print("Starting Bridge")
        uvicorn.run(app, host="0.0.0.0", port=14935)

    def component_will_mount(self):
        """
        This method is called before the render method is executed and is used to
        create a threadpool to run the webclient and bridge concurrently
        """
        self.threadpool = QThreadPool()
        self.webclient = ThreadWorker(self.__run_webclient)
        self.bridge = ThreadWorker(self.__bridge)
        self.threadpool.start(self.webclient)
        self.threadpool.start(self.bridge)

    def render_(self):
        while True:
            # await for the webclient thread to start, then load the UI
            try:
                if requests.get("http://localhost:5173").status_code == 200:
                    print("QtWebEngine is running")
                    break
            except:
                pass

        print("Loading UI")
        self.setWindowTitle(self.build_settings["app_name"])
        self.webview = QWebEngineView()
        self.webview.load(QUrl("http://localhost:5173/"))
        self.setCentralWidget(self.webview)

    def responsive_UI(self):
        self.setMinimumSize(1266, 740)

    def closeEvent(self, event):
        """
        This method is called when the user closes the application and kills
        all the processes that were started by the application (bridge, webclient)
        """

        #Todo: detect OS and kill processes accordingly
        os.system("taskkill /f /im node.exe")
        os.system("taskkill /f /im python.exe")
        os.system("taskkill /f /im Deskport.exe")
        os.system('netstat -ano | find "LISTENING" | find "5173" | taskkill /F /T')

        event.accept()


if __name__ == '__main__':
    appctxt = ApplicationContext()
    window = DeskPort()
    window.show()
    exit_code = appctxt.app.exec()
    sys.exit(exit_code)