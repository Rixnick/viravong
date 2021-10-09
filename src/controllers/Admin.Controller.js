const Mail = require('../models/Mail');

module.exports.get_Admin = async (req, res, next) => {
  try {
    res.render('admin/index')
  } catch (error) {
    next(error)
  }
}


module.exports.get_allMail = async (req, res, next) => {
  try {
    const mails = await Mail.find({}).sort({ createdAt: -1 });

    res.render('admin/visitors/Mailing', {
      mails: mails
    })
  } catch (error) {
    next(error)
  }
}

module.exports.post_sendMail = async (req, res, next) => {
  try {
    const {name, email, subj, message} = req.body;
    
    const mail = new Mail({
      name: name,
      email: email,
      subj: subj,
      message: message
    });

    await mail.save();

    res.redirect('/')
  } catch (error) {
    next(error)
  }
}


module.exports.get_readMail = async (req, res, next) => {
  try {
    const {id} = req.params;

    const mail = await Mail.findById(id);

    res.render('admin/visitors/Read', {
      name: mail.name,
      email: mail.email,
      subj: mail.subj,
      message: mail.message,
      id: mail._id,
      createdAt: mail.createdAt.toLocaleString()
    })
  } catch (error) {
    next(error)
  }
}
