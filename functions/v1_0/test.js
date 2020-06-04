exports.logRoute = async function(request, response) {
    console.log(request.method);
    console.log(request.path);
    console.log(request.body);
    return response.status(200).send("OK");
};
