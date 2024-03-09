import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  productList: Product[] = [];
  newProductForm: FormGroup;
  selectedImage: File | null = null;
  imageUrl: string = '';
  editingIndex: number | null = null; 

  constructor(private productService: ProductService, private formBuilder: FormBuilder) {
    this.newProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productCode: ['', Validators.required],
      releaseDate: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      inStock: ['', [Validators.required, Validators.min(0)]],
      imageUrl: [null, Validators.required] 
    });
  }
  

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProductAll().subscribe(products => {
      this.productList = products;
    });
  }
  AddNewProduct() {
    if (this.newProductForm.valid) {
      const formData = this.newProductForm.value;
      const imagePath = formData.imageUrl.replace(/^.*[\\\/]/, ''); 
      this.imageUrl = '../assets/img/' + imagePath;
      formData.imageUrl = this.imageUrl;
      this.productService.addProduct(formData).subscribe(() => {
        this.loadProducts();
        this.newProductForm.reset();
        this.productService.nextId++; 
      });
    }
  }
  

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }

  Edit(index: number) {
    this.editingIndex = index; // Lưu chỉ số của sản phẩm đang được chỉnh sửa
    const productToEdit = this.productList[index];
    this.newProductForm.patchValue({
      productName: productToEdit.productName,
      productCode: productToEdit.productCode,
      releaseDate: productToEdit.releaseDate,
      description: productToEdit.description,
      price: productToEdit.price,
      inStock: productToEdit.inStock,
      imageUrl: productToEdit.imageUrl
    });
  }
  Update() {
    if (this.editingIndex !== null) {
      const formData = this.newProductForm.value;
      const productId = this.productList[this.editingIndex].id;
      this.productService.updateProduct(productId, formData).subscribe(() => {
        this.loadProducts();
        this.editingIndex = null;
        this.newProductForm.reset();
      });      

    }
  }
  
  Delete(index: number) {
    if (confirm('Do you want to delete this product?')) {
      const productIdToDelete = this.productList[index].id;
      this.productService.DeleteProduct(productIdToDelete).subscribe(() => {
        this.loadProducts(); // Reload product list after deleting
      });
    }
  }
}
