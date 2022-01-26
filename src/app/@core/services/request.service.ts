import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization : 'faketoken'
  })
};
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  // apiUrl = 'http://46.105.30.197:3010';
  apiUrl = 'https://gagest.karoka.io/api';
  // apiUrl = 'http://localhost:3001';
  user: any;
  constructor(private http: HttpClient, private dts: DataService) {
    this.dts.user.subscribe(u => this.user = u);
  }

  setHeaderToken(token: string) {
    httpOptions.headers =
    httpOptions.headers.set('Authorization', token);
  }
  list(collection: string): Promise<any> {
    // return this.http.get(`${this.apiUrl}/${collection}/list/${this.userdata._id}`).toPromise();
    return this.http.get(`${this.apiUrl}/${collection}/list`).toPromise();
  }
  save(collection: string, dataParams: any): Promise<any> {
    return this.http.post(`${this.apiUrl}/${collection}/save`, dataParams).toPromise();
  }
  update(collection: string, data: any): Promise<any> {
    console.log(data._id);
    return this.http.post(`${this.apiUrl}/${collection}/update/${data._id}`, {content: data}).toPromise();
  }
  delete(collection: string, id: string): Promise<any> {
    return this.http.get(`${this.apiUrl}/${collection}/delete/${id}`).toPromise();
  }

  checkLogin(loginData): Promise<any> {
    return this.http.post(`${this.apiUrl}/logins/checkLogin`, loginData).toPromise();
  }

  changePassword(loginData): Promise<any> {
    return this.http.post(`${this.apiUrl}/logins/changePassword`, loginData).toPromise();
  }

  getUserData(id): Promise<any> {
    return this.http.get(`${this.apiUrl}/users/getData/${id}`, httpOptions).toPromise();
  }

  updateUser(userdata): Promise<any> {
    return this.http.post(`${this.apiUrl}/users/update/${this.user._id}`, {content: userdata}).toPromise();
  }
  // saveProducts(product): Promise<any> {
  //   product.user = this.user._id;
  //   return this.http.post(`${this.apiUrl}/products/save`, {data: product}).toPromise();
  // }

  // insertManyProducts(products): Promise<any> {
  //   return this.http.post(`${this.apiUrl}/products/insertMany`, {data: products}).toPromise();
  // }

  // getProducts(): Promise<any> {
  //   return this.http.get(`${this.apiUrl}/products/list/${this.user._id}`).toPromise();
  // }
  // getOneProduct(id): Promise<any> {
  //   return this.http.get(`${this.apiUrl}/products/getOne/${this.user._id}/${id}`).toPromise();
  // }
  // deleteProducts(id): Promise<any> {
  //   return this.http.get(`${this.apiUrl}/products/delete/${id}`).toPromise();
  // }
  // decreaseProducts(products): Promise<any> {
  //   return this.http.post(`${this.apiUrl}/products/decreaseMany/${this.user._id}`, {products}).toPromise();
  // }

  // deleteManyProducts(ids: any[]): Promise<any> {
  //   return this.http.post(`${this.apiUrl}/products/deleteMany`, {data: ids}).toPromise();
  // }
  // updateProduct(product): Promise<any> {
  //   const id = '' + product._id;
  //   delete product._id;
  //   return this.http.post(`${this.apiUrl}/products/update/${id}/${this.user._id}`, {content: product}).toPromise();
  // }
  // validateProduct(id): Promise<any> {
  //   return this.http.get(`${this.apiUrl}/products/validate/${id}`).toPromise();
  // }

  // checkQty(): Promise<any> {
  //   return this.http.get(`${this.apiUrl}/products/checkQty/${this.user._id}`).toPromise();
  // }
  saveProducts(product): Promise<any> {
    product.user = this.user._id;
    return this.http.post(`${this.apiUrl}/products/save`, {data: product}).toPromise();
  }

  insertManyProducts(products): Promise<any> {
    return this.http.post(`${this.apiUrl}/products/insertMany`, {data: products}).toPromise();
  }

  getProducts(): Promise<any> {
    return this.http.get(`${this.apiUrl}/products/list/${this.user._id}`).toPromise();
  }
  getOneProduct(id): Promise<any> {
    return this.http.get(`${this.apiUrl}/products/getOne/${this.user._id}/${id}`).toPromise();
  }
  deleteProducts(id): Promise<any> {
    return this.http.get(`${this.apiUrl}/products/delete/${id}`).toPromise();
  }
  decreaseProducts(products): Promise<any> {
    return this.http.post(`${this.apiUrl}/products/decreaseMany/${this.user._id}`, {products}).toPromise();
  }

  deleteManyProducts(ids: any[]): Promise<any> {
    return this.http.post(`${this.apiUrl}/products/deleteMany`, {data: ids}).toPromise();
  }
  updateProduct(product): Promise<any> {
    const id = '' + product._id;
    delete product._id;
    return this.http.post(`${this.apiUrl}/products/update/${id}/${this.user._id}`, {content: product}).toPromise();
  }
  validateProduct(id): Promise<any> {
    return this.http.get(`${this.apiUrl}/products/validate/${id}`).toPromise();
  }

  checkQty(): Promise<any> {
    return this.http.get(`${this.apiUrl}/products/checkQty/${this.user._id}`).toPromise();
  }

  addCategory(category: string): Promise<any> {
    return this.http.post(`${this.apiUrl}/categories/add/${this.user._id}`, {data: category}).toPromise();
  }
  addManyCategories(categories: Array<any>): Promise<any> {
    return this.http.post(`${this.apiUrl}/categories/addMany/${this.user._id}`, {data: categories}).toPromise();
  }
  getCategories(): Promise<any> {
    return this.http.get(`${this.apiUrl}/categories/list/${this.user._id}`).toPromise();
  }
  deleteCategorie(categorie): Promise<any> {
    return this.http.post(`${this.apiUrl}/categories/delete/${this.user._id}`, {categorie}).toPromise();
  }

  getEntry(): Promise<any> {
    return this.http.get(`${this.apiUrl}/entry/list/${this.user._id}`).toPromise();
  }
  addEntry(entry): Promise<any> {
    return this.http.post(`${this.apiUrl}/entry/add/${this.user._id}`, {entry}).toPromise();
  }
  deleteEntry(id): Promise<any> {
    return this.http.get(`${this.apiUrl}/entry/delete/${this.user._id}/${id}`).toPromise();
  }

  getCommandes(): Promise<any> {
    return this.http.get(`${this.apiUrl}/commandes/list/${this.user._id}`).toPromise();
  }
  getOneCommande(id): Promise<any> {
    return this.http.get(`${this.apiUrl}/commandes/getOne/${id}`).toPromise();
  }
  updateCommande(commande): Promise<any> {
    const id = '' + commande._id;
    delete commande._id;
    return this.http.post(`${this.apiUrl}/commandes/update/${id}`, {content: commande}).toPromise();
  }

  addSortie(sortie): Promise<any> {
    return this.http.post(`${this.apiUrl}/sorties/add/${this.user._id}`, {sortie}).toPromise();
  }
  getSortie(): Promise<any> {
    return this.http.get(`${this.apiUrl}/sorties/list/${this.user._id}`).toPromise();
  }

  saveClient(client): Promise<any> {
    client.user = this.user._id;
    return this.http.post(`${this.apiUrl}/clients/save`, {data: client}).toPromise();
  }
  getClients(): Promise<any> {
    return this.http.get(`${this.apiUrl}/clients/list/${this.user._id}`).toPromise();
  }

  updateClient(client): Promise<any> {
    const id = '' + client._id;
    delete client._id;
    return this.http.post(`${this.apiUrl}/clients/update/${id}`, {content: client}).toPromise();
  }
  saveFournisseur(fournisseur): Promise<any> {
    fournisseur.user = this.user._id;
    return this.http.post(`${this.apiUrl}/fournisseurs/save`, {data: fournisseur}).toPromise();
  }
  getFournisseurs(): Promise<any> {
    return this.http.get(`${this.apiUrl}/fournisseurs/list/${this.user._id}`).toPromise();
  }

  updateFournisseur(fournisseur): Promise<any> {
    const id = '' + fournisseur._id;
    delete fournisseur._id;
    return this.http.post(`${this.apiUrl}/fournisseurs/update/${id}`, {content: fournisseur}).toPromise();
  }


  getNotification(): Promise<any> {
    return this.http.get(`${this.apiUrl}/notifications/list/${this.user._id}`).toPromise();
  }
  updateNotification(update): Promise<any> {
    const id = update._id;
    delete update._id;
    return this.http.post(`${this.apiUrl}/notifications/update/${id}`, {update}).toPromise();
  }
  saveColis(colis): Promise<any> {
    colis.user = this.user._id;
    return this.http.post(`${this.apiUrl}/colis/save`, {colis}).toPromise();
  }
  getColis(): Promise<any> {
    return this.http.get(`${this.apiUrl}/colis/list/${this.user._id}`).toPromise();
  }

  updateColis(colis): Promise<any> {
    const id = '' + colis._id;
    delete colis._id;
    return this.http.post(`${this.apiUrl}/colis/update/${id}`, {content: colis}).toPromise();
  }


}
