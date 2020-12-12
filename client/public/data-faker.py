from datetime import datetime, timedelta

import json
import random

def random_date(start, end):
    delta = end - start
    int_delta = delta.days * 24 * 60 * 60 + delta.seconds
    random_second = random.randrange(int_delta)
    return start + timedelta(seconds=random_second)

with open("fake-data.json", "w") as ofp:
    fake_entries = []
    for i in range(10):
        bed_number = "x9n" + str(i+1)
        last_screen_dt = random_date(datetime(2020, 12, 11, 0, 0, 0), datetime(2020, 12, 13, 0, 0, 0))
        next_screen_dt = last_screen_dt + timedelta(days=1)
        last_screen_passed = random.choice(["passed", "failed", "notDone", None])
        fake_entries.append(dict(
            bedNumber=bed_number,
            lastScreenDT=last_screen_dt.strftime("%Y-%m-%dT%H:%MZ"),
            lastScreenPassed=last_screen_passed,
            nextScreenDT=next_screen_dt.strftime("%Y-%m-%dT%H:%MZ")
        ))
    json.dump(fake_entries, ofp)