import os
from os.path import join
from utils.fs import FileSystem
import subprocess
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)


fs = FileSystem()

class PPGEngine:
    def __init__(self, settings: dict, template_path: str, output_path: str, url_app: bool = False):
        self.settings = settings
        self.template_path = template_path
        self.output_path = output_path

        template_path = lambda relpath: join(self.output_path, *relpath.split('/'))

        self.files_to_filter=[
            template_path('src/build/settings/base.json'),
            template_path('src/build/settings/mac.json'),
            template_path('src/main/python/main.py')
        ]

    def replace_variables(self, text, variables):
        """This method replaces the variables in the text with the values in the
            variables dictionary into self.files_to_copy

        Args:
            text (_type_): file content
            variables (_type_): dictionary with the variables to replace

        Returns:
            _type_: file content with the variables replaced
        """
        for key, value in variables.items():
            placeholder = "${" + key + "}"
            text = text.replace(placeholder, value)
        return text


    def copy_with_filtering(self):
        """
            Copy all the files in resources/base/project_template to the output_path folder
            and replace the variables in the files with the values in the settings dictionary
            finally update the copy content in the output_path folder
        """

        variables = {
            "app_name": self.settings["appName"],
            "author": self.settings["author"],
            "app_version": self.settings["appVersion"],
            "binding": self.settings["binding"],
            "mac_bundle_identifier": self.settings["macBundle"],
            "class_name": self.settings["appName"].replace(" ", "").replace("_", "").replace("-", "").title(),
            # todo: change this to a file_url path in the future
            "app_url": self.settings["appUrl"] if self.settings["appUrl"] else "https://www.google.com"
        }

        try:
            fs.copy_folder(self.template_path, self.output_path)
        except FileNotFoundError as e:
            logger.error(f"Error al copiar la carpeta: {str(e)}")
            pass
        finally:
            current_folder = os.path.dirname(os.path.abspath(__file__))
            parent_folder = os.path.dirname(current_folder)
            project_template_path = os.path.join(parent_folder, "project_template")
            logger.info(f"production project_template_path: {project_template_path}")
            fs.copy_folder(project_template_path, self.output_path)


        for file in self.files_to_filter:
            with open(file, 'r') as f:
                content = f.read()
                content = self.replace_variables(content, variables)
            with open(file, 'w') as f:
                f.write(content)

    def run_command_in_new_terminal(self, command):
        subprocess.run(['cmd', '/c', 'start', 'cmd', '/k', command])

    def compile_app(self):
        """
            Compile project in other folder with ppg
        """
        # check if python is installed
        if os.system("python --version") != 0:
            return (False, "Python is not installed")

        if os.system("pyinstaller --version") != 0:
            return (False, "Pyinstaller is not installed")

        if os.system("ppg version") != 0:
            return (False, "PPG is not installed")

        # todo: debug flag should be passed by webclient in the future
        self.run_command_in_new_terminal(f"c: && cd {self.output_path} && ppg freeze --debug && exit")

        return (True, "")


    def build_nsis(self):
        """
            Build the installer for windows
        """
        pass
