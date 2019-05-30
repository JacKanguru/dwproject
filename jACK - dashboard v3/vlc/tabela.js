class IpTables {

  constructor() {
    this.addresses = []

    this.ipTableContent = document.querySelector('table#iptable tbody')
    this.warningField = document.querySelector('#warning')
    this.addressForm = document.querySelector('form#add-ip')
    this.addressInput = Array.from(this.addressForm.querySelectorAll('input'))

    this.loadAddAddreessEvent(document.querySelector('button#cadastrar'))
  }

  addAddress(address) {
    this.addresses.push(address)
  }

  hasAddress(address) {
    return this.addresses.some(addressSelected => addressSelected.porta == address)
  }

  // View
  render() {
    this.addresses.forEach(address => this.genRowContent(address))
  }

  addRow(address) {
    if (this.hasAddress(address.porta)) {
      this.showAlert()
    } else {
      this.addAddress(address)
      this.genRowContent(address)
      this.hiddenAlert()
    }
  }

  genRowContent(address) {
    const row = `<tr data-ip="${address.ip}">
    <td class="porta">${address.porta}</td>
    <td class="ip">${address.ip}</td>

    <td class="">
    <a href="#" class="">Assistir <svg xmlns="http://www.w3.org/2000/svg" class="feather feather-play-circle sc-dnqmqq jxshSx" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" height="24" data-reactid="961"><circle cx="12" cy="12" r="10" /><polygon points="10,8 16,12 10,16 10,8" /></svg></a> 
    </td>

    <td>
    <a href="#">Encerrar <svg xmlns="http://www.w3.org/2000/svg" class="feather feather-x-circle sc-dnqmqq jxshSx" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" height="24"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg></a>
    </td>

    <td>
    <a class="" href="#"> Gerar Link
    <svg xmlns="http://www.w3.org/2000/svg" class="feather feather-link sc-dnqmqq jxshSx" aria-hidden="true"
      fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      viewBox="0 0 24 24" width="24" height="24">
      <path d="M 10 13 a 5 5 0 0 0 7.54 0.54 l 3 -3 a 5 5 0 0 0 -7.07 -7.07 l -1.72 1.71" />
      <path d="M 14 11 a 5 5 0 0 0 -7.54 -0.54 l -3 3 a 5 5 0 0 0 7.07 7.07 l 1.71 -1.71" /></svg>
  </a></td>
    </tr>`

    this.ipTableContent.insertAdjacentHTML('afterbegin', row)
  }

  showAlert() {
    this.warningField.innerHTML = `<div class="alert alert-warning" role="alert">
      <strong>Esta Porta já estão em uso.</strong>
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`
  }

  hiddenAlert() {
    this.warningField.innerHTML = ''
  }

  // Events
  loadAddAddreessEvent(addButton) {
    addButton.addEventListener('click', (event) => {
      event.preventDefault()

      const formData = new FormData(this.addressForm)
      const ip = formData.get('ip') || '-'
      const porta = formData.get('porta') || '-'
      const address = { ip, porta}

      this.addressInput.forEach(input => input.value = '')
      this.addRow(address)
      addButton.blur()
    })
  }

}

const iptables = new IpTables()