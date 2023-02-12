import { makeAutoObservable } from 'mobx'

export default class DeviceStore {
  constructor () {
    this._types = [
      // { id: 1, name: 'Холодильник' },
      // { id: 2, name: 'Смартфоны' },
      // { id: 3, name: 'Компьютеры' },
      // { id: 4, name: 'Ноутбуки' },
      // { id: 5, name: 'Аксессуары' },
      // { id: 6, name: 'Наушники' },
      // { id: 7, name: 'Колонки' },
      // { id: 8, name: 'Зарядки' },
      // { id: 9, name: 'Планшеты' },
      // { id: 10, name: 'Сумки' }
    ]
    this._brands = [
      // { id: 1, name: 'Apple' },
      // { id: 2, name: 'Samsung' },
      // { id: 3, name: 'Xiaomi' },
      // { id: 4, name: 'Huawei' },
      // { id: 5, name: 'Lenovo' },
      // { id: 6, name: 'Sony' },
      // { id: 7, name: 'Asus' },
      // { id: 8, name: 'Aser' }
    ]
    this._devices = [
      // { id: 1, name: 'Iphone 12 pro', price: 250000, rating: 5, img: 'https://www.ixbt.com/img/x780x600/r30/00/02/56/75/cover.jpg' },
      // { id: 2, name: 'Iphone 13 pro', price: 300000, rating: 5, img: 'https://www.ixbt.com/img/x780x600/r30/00/02/56/75/cover.jpg' },
      // { id: 3, name: 'Iphone 12', price: 150000, rating: 5, img: 'https://www.ixbt.com/img/x780x600/r30/00/02/56/75/cover.jpg' },
      // { id: 4, name: 'Iphone 13', price: 200000, rating: 5, img: 'https://www.ixbt.com/img/x780x600/r30/00/02/56/75/cover.jpg' },
      // { id: 5, name: 'Samsung S22', price: 200000, rating: 5, img: 'https://www.ixbt.com/img/x780x600/r30/00/02/56/75/cover.jpg' },
      // { id: 6, name: 'Samsung S21', price: 200000, rating: 5, img: 'https://www.ixbt.com/img/x780x600/r30/00/02/56/75/cover.jpg' },
      // { id: 7, name: 'Samsung S10', price: 200000, rating: 5, img: 'https://www.ixbt.com/img/x780x600/r30/00/02/56/75/cover.jpg' },
      // { id: 8, name: 'Samsung S9', price: 200000, rating: 5, img: 'https://www.ixbt.com/img/x780x600/r30/00/02/56/75/cover.jpg' }
    ]
    this._selectedType = {}
    this._selectedBrand = {}
    this._page = 1
    this._totalCount = 0
    this._limit = 3
    makeAutoObservable(this)
  }

  setTypes (types) {
    this._types = types
  }

  setBrands (brands) {
    this._brands = brands
  }

  setDevices (devices) {
    this._devices = devices
  }

  setSelectedType (type) {
    this._selectedType = type
  }

  setSelectedBrand (brand) {
    this._selectedBrand = brand
  }

  setPage (page) {
    this._page = page
  }

  setTotalCount (count) {
    this._totalCount = count
  }

  setLimit (limit) {
    this._limit = limit
  }

  get types () {
    return this._types
  }

  get brands () {
    return this._brands
  }

  get devices () {
    return this._devices
  }

  get selectedType () {
    this.setPage(1)
    return this._selectedType
  }

  get selectedBrand () {
    this.setPage(1)
    return this._selectedBrand
  }

  get totalCount () {
    return this._totalCount
  }

  get page () {
    return this._page
  }

  get limit () {
    return this._limit
  }
}
