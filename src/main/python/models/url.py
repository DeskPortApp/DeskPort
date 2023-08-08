from pydantic import BaseModel
from typing import Optional

class URLModel(BaseModel):
    appName: str
    appVersion: str
    macBundle: str
    author: str
    binding: str
    appUrl: Optional[str] = None
    appIcon: str
    sourceCode: Optional[str] = None
    nsis: bool
