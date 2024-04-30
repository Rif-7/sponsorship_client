const api_url = 'http://localhost:4000';

const requestBoilerplate = async (url, method, body = null) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Auth token not found. Try logging in again.' };
    }
    const response = await fetch(url, {
      method,
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Error.' };
  }
};

const get_student_details = async token => {
  try {
    const response = await fetch(`${api_url}/users/student`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Error.' };
  }
};

const get_sponsor_details = async token => {
  try {
    const response = await fetch(`${api_url}/users/sponsor`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Error.' };
  }
};

const sign_up_student = async (
  firstname,
  lastname,
  institution,
  email,
  password
) => {
  try {
    const response = await fetch(`${api_url}/users/sign_up_student`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        institution,
        email,
        password,
      }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Error.' };
  }
};

const login_student = async (email, password) => {
  try {
    const response = await fetch(`${api_url}/users/login_student`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Error.' };
  }
};

const sign_up_sponsor = async (company, contact, email, password) => {
  try {
    const response = await fetch(`${api_url}/users/sign_up_sponsor`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company,
        contact,
        email,
        password,
      }),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Error.' };
  }
};

const login_sponsor = async (email, password) => {
  try {
    const response = await fetch(`${api_url}/users/login_sponsor`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Error.' };
  }
};

const request_sponsorship = async (name, amount, description) => {
  return await requestBoilerplate(
    `${api_url}/`,
    'POST',
    JSON.stringify({
      name,
      amount,
      description,
    })
  );
};

const get_student_requests = async () => {
  return await requestBoilerplate(`${api_url}/sponsorships/requested`, 'GET');
};

const get_all_requests = async () => {
  return await requestBoilerplate(`${api_url}/sponsorships/all`, 'GET');
};

const accept_sponsorship = async sponsorship_id => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Auth token not found. Try logging in again.' };
    }
    const response = await fetch(`${api_url}/${sponsorship_id}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (err) {
    return { error: 'Error.' };
  }
};

const get_accepted_sponsorships = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Auth token not found. Try logging in again.' };
    }

    const response = await fetch(`${api_url}/sponsorships/accepted`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (err) {
    return { error: 'Error.' };
  }
};

const remove_sponsorship = async sponsorship_id => {
  return await requestBoilerplate(`${api_url}/${sponsorship_id}`, 'DELETE');
};

const upload_certificate = async formData => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Auth token not found. Try logging in again.' };
    }
    const response = await fetch(`${api_url}/certificate`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Error.' };
  }
};

export {
  get_student_details,
  sign_up_student,
  login_student,
  get_sponsor_details,
  sign_up_sponsor,
  login_sponsor,
  request_sponsorship,
  get_student_requests,
  get_all_requests,
  accept_sponsorship,
  get_accepted_sponsorships,
  remove_sponsorship,
  upload_certificate,
};
