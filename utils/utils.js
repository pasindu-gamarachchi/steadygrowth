

const isValidDateFormat = (dateString) => {
    const dataRegEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(dataRegEx);

}


module.exports = {
    isValidDateFormat
}