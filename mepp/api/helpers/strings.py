# coding: utf-8
import re

from unidecode import unidecode


def normalize(str_: str) -> str:

    normalized_str = unidecode(str_)
    normalized_str = re.sub(r'[^a-zA-Z0-9]', ' ', normalized_str)
    normalized_str = re.sub(r' {2,}', ' ', normalized_str)
    return normalized_str.strip()
