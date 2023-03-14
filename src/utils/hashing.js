import bcrypt from 'bcrypt'

export function hashing(password) {
  return bcrypt.hashSync(password, 10);
}

export function checkPassword(password, adminPassword) {
  return bcrypt.compareSync(password, adminPassword)
}
