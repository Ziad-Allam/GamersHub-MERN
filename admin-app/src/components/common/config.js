export const loginFormControls = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    elementType: 'input',
    type: 'text',
  },
  {
    name: 'password',
    label: 'password',
    placeholder: 'Enter your password',
    elementType: 'input',
    type: 'password',
  },
]

export const addProductFormControls = [
  {
    label: "Title",
    name: "title",
    elementType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    elementType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    elementType: "select",
    options: [
      { id: "consoles", label: "Consoles" },
      { id: "laptops", label: "Laptops" },
      { id: "monitors", label: "Monitors" },
      { id: "cards", label: "Cards" },
      { id: "pc-components", label: "PC Components" },
    ],
  },
  {
    label: "Subcategory",
    name: "subcategory",
    elementType: "select",
    options: [
      { id: "gaming-laptops", label: "Gaming Laptops" },
      { id: "playstation", label: "Playstation" },
      { id: "xbox", label: "Xbox" },
      { id: "gaming-monitors", label: "Gaming monitors" },
      { id: "graphic-cards", label: "Graphic Cards" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    elementType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    elementType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    elementType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    elementType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const addBrandFormControls = [
  {
    label: "Title",
    name: "title",
    elementType: "input",
    type: "text",
    placeholder: "Enter brand title",
  },
];

export const addCategoryFormControls = [
  {
    label: "Title",
    name: "title",
    elementType: "input",
    type: "text",
    placeholder: "Enter category title",
  },
];

export const createAdmin = [
  {
    label: "First Name",
    name: "firstname",
    elementType: "input",
    type: "text",
    placeholder: "Enter the first name",
  },
  {
    label: "Last Name",
    name: "lastname",
    elementType: "input",
    type: "text",
    placeholder: "Enter the last name",
  },
  {
    label: "Role",
    name: "role",
    elementType: "select",
    options: [
      { id: "superAdmin", title: "Super Admin" },
      { id: "admin", title: "Admin" },
    ],
  },
  {
    label: 'Email',
    name: 'email',
    elementType: 'input',
    type: 'email',
    placeholder: 'Enter the email',
  },
  {
    label: "Mobile",
    name: "mobile",
    elementType: "input",
    type: "number",
    placeholder: "Enter the mobile number",
  },
  {
    label: 'Password',
    name: 'password',
    elementType: 'input',
    type: 'password',
    placeholder: 'Enter the password',
  },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    elementType: 'input',
    type: 'password',
    placeholder: 'Confirm the password',
  },
];



export const base_url = "http://localhost:5000/api/";