import os
import shutil

class FileSystem:

    def __init__(self):
        super().__init__()

    def get_desktop_path(self):
        if os.name == 'posix':  # Sistema operativo tipo Unix (Linux, macOS, etc.)
            return os.path.join(os.path.expanduser('~'), 'Desktop')
        elif os.name == 'nt':  # Sistema operativo Windows
            return os.path.join(os.path.join(os.environ['USERPROFILE']), 'Desktop')
        else:
            raise OSError("Sistema operativo no soportado: " + os.name)

    def get_project_template_path(self):
        current_folder = os.path.dirname(os.path.abspath(__file__))
        parent_folder = os.path.dirname(current_folder)
        parent_of_parent_folder = os.path.dirname(parent_folder)
        return os.path.join(parent_of_parent_folder, "resources/base/project_template")

    def exists(self, path):
        return os.path.exists(path)

    def create_folder(self, path, name):
        os.mkdir(os.path.join(path, name))

        return os.path.join(path, name)

    def copy_folder(self, source_folder, destination_folder):
        try:
            shutil.copytree(source_folder, destination_folder)
            print("Carpeta copiada con éxito.")
        except Exception as e:
            pass
        