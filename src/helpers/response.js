module.exports = {
    ok: (data,res) => {
        const message = {
            status: 200,
            data: data
        }
        res.send(message)
    },
    bad: (errMsg,res) => {
        const message = {
            status: 400,
            message: errMsg
        }
        res.status(400).send(message)
    },
    notFound: (errMsg,res) => {
        const message = {
            status:404,
            message:errMsg
        }
        res.status(404).send(message)
    },
    alreadyExist: (errMsg,res) => {
        const message = {
            status:422,
            message:errMsg
        }
        res.status(422).send(message)
    }, 
    unauthorized: (res) => {
        const message = {
            status:401,
            message:"You dont have permission to this route"
        }
        res.status(401).send(message)
    }
}