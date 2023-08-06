import sys
import os
from ppg_runtime.application_context.PySide6 import ApplicationContext, PPGLifeCycle
from PySide6.QtWidgets import QMainWindow
from PySide6.QtCore import QUrl, QRunnable, QThreadPool
from PySide6.QtWebEngineWidgets import QWebEngineView
import requests

class ThreadWorker(QRunnable):
    def __init__(self, fn, *args, **kwargs):
        super(ThreadWorker, self).__init__()
        self.fn = fn
        self.args = args
        self.kwargs = kwargs

    def run(self):
        self.fn(*self.args, **self.kwargs)



class DeskPort(PPGLifeCycle, QMainWindow, ApplicationContext):

    def __run_server(self):
        os.system("cd " + self.get_resource("") + " && yarn vite")

    def component_will_mount(self):

        self.threadpool = QThreadPool()
        self.threadpool.start(ThreadWorker(self.__run_server))


    def render_(self):
        # check if server is running until it is running
        while True:
            try:
                if requests.get("http://localhost:5173").status_code == 200:
                    print("Server is running")
                    break
            except:
                pass

        print("Loading UI")
        self.setWindowTitle(self.build_settings["app_name"])
        self.webview = QWebEngineView()
        self.webview.load(QUrl("http://localhost:5173/"))
        self.setCentralWidget(self.webview)

    def responsive_UI(self):
        self.setMinimumSize(1024, 640)

    # Detect when the window is closed
    def closeEvent(self, event):
        # Kill thread from threadpool
        self.threadpool.clear()
        # Kill the server
        event.accept()

if __name__ == '__main__':
    appctxt = ApplicationContext()
    window = DeskPort()
    window.show()
    exit_code = appctxt.app.exec()
    sys.exit(exit_code)