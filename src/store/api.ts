const debug = false;

// companySlices
export interface IMovies {
  id: number;
  title: string;
  thumbnail: {
    trending: {
      small: string;
      large: string;
    };
    regular: {
      small: string;
      medium: string;
      large: string;
    };
  };
  year: number;
  category: string;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

/* export const emptyCompany = {
  id: 0,
  name: 'Company',
  company_info: {
    company_name: '',
    company_name_error: true,
    company_number: '',
    company_number_error: true,
    industry: '',
    industry_error: true,
  },
  mailing_address: {
    address_line1: '',
    address_line1_error: true,
    address_line2: '',
    address_line2_error: true,
    city: '',
    city_error: true,
    state: '',
    state_error: true,
    postal_code: '',
    postal_code_error: true,
  },
  package_return_address: {
    same_as_mailing_address: false,
    same_as_mailing_address_error: true,
    address_line21: '',
    address_line21_error: true,
    address_line22: '',
    address_line22_error: true,
    city2: '',
    city2_error: true,
    state2: '',
    state2_error: true,
    postal_code2: '',
    postal_code2_error: true,
  },
  primary_contact: {
    first_name: '',
    first_name_error: true,
    last_name: '',
    last_name_error: true,
    title: '',
    title_error: true,
    primary_contact_email_address: '',
    primary_contact_email_address_error: false,
    primary_contact_phone_number: '',
    primary_contact_phone_number_error: false,
  },
}; */

export async function getMovies(): Promise<IMovies[]> {
  const results = await fetch('/data.json');
  const movies = results.json();
  if (debug) console.log('api: ', movies);
  return movies;
}

/* export async function setCompanies(companies: Companies[]) {
  console.log('api: ', companies);
  var content = JSON.stringify(companies);
  var fileName = '/datacompany.json';
  var contentType = 'text/plain';

  var a = document.createElement('a');
  var file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
} */

// authSlices
export interface Auth {
  token: string | null;
  username: string | null;
}

export interface UserData {
  username: string;
  password: string;
}

export async function logInData(): Promise<UserData[]> {
  console.log('logInData');
  const results = await fetch('/datauser.json');
  const users = results.json();
  return users;
}
