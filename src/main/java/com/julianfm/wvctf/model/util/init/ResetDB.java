package com.julianfm.wvctf.model.util.init;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.julianfm.wvctf.model.entity.Category;
import com.julianfm.wvctf.model.entity.Product;
import com.julianfm.wvctf.model.entity.Users;
import com.julianfm.wvctf.model.entity.mongo.Contact;
import com.julianfm.wvctf.model.repository.CategoryRepository;
import com.julianfm.wvctf.model.repository.ProductRepository;
import com.julianfm.wvctf.model.repository.UserRepository;
import com.julianfm.wvctf.model.repository.mongo.ContactRepository;

@Component
public class ResetDB {
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	CategoryRepository categoryRepository;
	
	@Autowired
	ContactRepository contactRepository;
	
	public void resetDBvalues () {
		contactRepository.deleteAll();
		productRepository.deleteAll();
		categoryRepository.deleteAll();
		userRepository.deleteAll();
		
		Users user1 = userRepository.save(new Users("user1","user1p","123456789","MyHouse, MyStreet MyNumber, MyCountry"));
		contactRepository.save(new Contact(null,"user1","123456789","user1@wvctf.com"));
		Users user2 = userRepository.save(new Users("user2","user2p","987654321","MyHouse, MyStreet MyNumber, MyCountry"));
		contactRepository.save(new Contact(null,"user2","987654321","user2@wvctf.com"));
		userRepository.save(new Users("flag_user","flag_9db3e2d42abc40b2ac3ae54b7d6e2c528fb22f288402e5d671e6cf8c194413fc","00112233","MyHouse, MyStreet MyNumber, MyCountry"));
		contactRepository.save(new Contact(null,"","flag_a6c5023f020fac7b8bb87ae1aad338ea80567057afe1dbf520a294f5cd931334","noreply@wvctf.com"));
		
		Category trousers = categoryRepository.save(new Category("Trousers"));
		categoryRepository.save(new Category("Shirts and t-shits"));
		Category shoes = categoryRepository.save(new Category("Shoes"));
		categoryRepository.save(new Category("Sweaters"));
		Category jackets = categoryRepository.save(new Category("Jackets"));
		categoryRepository.save(new Category("Dresses"));
		Category suits = categoryRepository.save(new Category("Suits"));
		categoryRepository.save(new Category("Underwear"));
		Category skirt = categoryRepository.save(new Category("Skirt"));
		categoryRepository.save(new Category("Other"));
		
		productRepository.deleteAll();
		productRepository.save(new Product(null,"Pantalón corto deportista", "Un pantalón corto especial para runners. Elástico y ligero.", 
				trousers, "L", "Rojo", 19.99, user1));
		productRepository.save(new Product(null,"Zapatos de vestir de piel", "Zapatos elegantes 100% piel. Duraderos y no filtran agua.", 
				shoes, "40-47", "Marrones", 95.50, user2));
		productRepository.save(new Product(null,"Cazadora de pelo para invierno", "Cazadora de pelo para los días más fríos.", 
				jackets, "M-XXL", "Negra", 108.00, user1));
		productRepository.save(new Product(null,"Traje negro completo", "Un traje negro completo. Incluye pajarita y camisa blanca. Barato", 
				suits, "XL", "Negro", 170.00, user2));
		productRepository.save(new Product(null,"Falda larga", "Oferta! Falda roja de terciopelo para eventos especiales.", 
				skirt, "S-L", "Rojo", 39.99, user1));
		
		contactRepository.deleteAll();
		contactRepository.save(new Contact(null,"user1","123456789","user1@wvctf.com"));
		contactRepository.save(new Contact(null,"user2","987654321","user2@wvctf.com"));
	}

}
