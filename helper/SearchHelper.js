module.exports.SearchHelper = (keyword)=>{

    const regex = new RegExp(keyword,'i')
    return regex
}