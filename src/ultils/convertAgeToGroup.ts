function convertAgeToGroup (age: number) {
    if (age < 20) {
        return 'UNDER_TWENTY';
    }

    if (age < 25) {
        return 'TWENTY_TO_TWENTYFOUR';
    }

    if (age < 30) {
        return 'TWENTYFIVE_TO_TWENTYNINE';
    }

    if (age < 35) {
        return 'THIRTY_TO_THIRTYFOUR';
    }

    if (age < 40) {
        return 'THIRTYFIVE_TO_THIRTYNINE';
    }

    if (age < 45) {
        return 'FORTY_TO_FORTYFOUR';
    }

    if (age < 50) {
        return 'FORTYFIVE_TO_FORTYNINE';
    }

    if (age < 55) {
        return 'FIFTY_TO_FIFTYFOUR';
    }

    if (age < 60) {
        return 'FIFTYFIVE_TO_FIFTYNINE';
    }

    if (age < 65) {
        return 'SIXTY_TO_SIXTYFOUR';
    }

    if (age < 70) {
        return 'SIXTYFIVE_TO_SIXTYNINE';
    }

    if (age >= 70) {
        return 'SEVENTY_TO_SEVENTYFIVE';
    }
}
export default convertAgeToGroup