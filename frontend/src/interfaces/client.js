const clientInterface = {
  id: Date.now(),
  firstName: '',
  lastName: '',
  job: '',
  phone: '',
  mail: '',
  companyName: '',
  address1: '',
  address2: '',
  zipcode: '',
  city: '',
  country:'',
  createdAt: this.item.createdAt = (() => {
    const date = new Date(Date.now());
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
})()

}

export { clientInterface };

