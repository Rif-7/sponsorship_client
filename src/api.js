const api_url = 'http://localhost:4000';

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
    const res = await response.json();
    return res;
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
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Auth token not found. Try logging in again.' };
    }
    const response = await fetch(`${api_url}/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        amount,
        description,
      }),
    });

    return await response.json();
  } catch (err) {
    return { error: 'Error.' };
  }
};

const get_student_requests = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Auth token not found. Try logging in again.' };
    }
    const response = await fetch(`${api_url}/sponsorships/requested`, {
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

const get_all_requests = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { error: 'Auth token not found. Try logging in again.' };
    }

    const response = await fetch(`${api_url}/sponsorships/all`, {
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
};
