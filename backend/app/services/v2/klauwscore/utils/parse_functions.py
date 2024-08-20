import re
import pandas as pd
import numpy as np
from dateutil.parser import parse


def parse_klauwscore_tabel(table):
    # Define header mapping dictionary
    columns_mapping = {
        "Koenummer": "koenummer",
        "Laatste behandeldatum": "behandeldatum",
        "Laatste notaties": "notatie",
    }

    # Extract and clean headers in one step
    columns = [
        columns_mapping.get(th.strip(), th.strip().replace(" ", "_"))
        for th in table.xpath(".//thead/tr/th/text()")
    ]

    data = [
        [td.strip() for td in tr.xpath(".//td/text()")]
        for tr in table.xpath(".//tbody/tr")
    ]

    data_clean = []
    for sublist in data:
        row_item = []
        if len(sublist) > 2:
            concatenated_item = " ".join(sublist[2:])
            row_item.extend(sublist[0:2])
            row_item.append(concatenated_item)
            data_clean.append(row_item)

    # create dataframe
    df = pd.DataFrame(columns=columns, data=data_clean)

    return df
