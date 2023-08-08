import sys
from ppg_runtime.application_context.${binding} import ApplicationContext, PPGLifeCycle
from ${binding}.QtWidgets import QMainWindow
from ${binding}.QtWebEngineWidgets import QWebEngineView
from ${binding}.QtCore import QUrl


class ${class_name}(PPGLifeCycle, QMainWindow, ApplicationContext):
    def render_(self):
        self.setWindowTitle(self.build_settings["app_name"])
        self.webview = QWebEngineView()
        self.webview.load(QUrl("${app_url}"))
        self.setCentralWidget(self.webview)

    def responsive_UI(self):
        self.setMinimumSize(800, 600)

if __name__ == '__main__':
    appctxt = ApplicationContext()
    window = ${class_name}()
    window.show()
    exit_code = appctxt.app.exec()
    sys.exit(exit_code)