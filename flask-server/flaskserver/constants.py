import joblib
from os.path import dirname, join, realpath

selective_courses = ['INT3105', 'INT3110', 'INT3117', 'INT3133', 'INT3217',
        'INT3122', 'INT3306', 'INT3505', 'INT3111', 'INT3206', 'INT3213', 'INT3307',
        'INT3301', 'INT3136', 'INT3402', 'INT3407', 'INT3405', 'INT3406', 'INT3411', 
        'INT3413', 'INT3512', 'INT3409', 'INT3121', 'INT3403', 'INT3404', 'INT3412', 
        'INT3108', 'INT3135', 'INT3136', 'INT3123', 'INT3138', 'INT2041', 'INT3137']

courses_without_data = ['INT3108', 'INT3135', 'INT3136', 'INT3123', 'INT3138', 'INT2041', 'INT3137', 'BSA2001', 'BSA2006', 'ELT2031']

with open(join(dirname(realpath(__file__)), "predict_model.pkl"), "rb") as f:
    model = joblib.load(f)

with open(join(dirname(realpath(__file__)), "predictions.pkl"), "rb") as f:
    predictions = joblib.load(f)