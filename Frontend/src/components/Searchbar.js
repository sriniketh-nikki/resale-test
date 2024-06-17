

import React, { useState, useEffect } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typingText, setTypingText] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [phCount, setPhCount] = useState(0);
  const [placeholders] = useState([
    'Pink Pattu Saree',
    'Temple Necklace Set',
    'green t-shirt',
    'Boys Kurta Pyjama'
  ]);

  const randDelay = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const printLetter = async (string, index) => {
    const arr = string.split('');
    if (index < arr.length) {
      setTypingText((prev) => prev + arr[index]);
      setPhCount(index + 1);
      await new Promise((resolve) => setTimeout(resolve, randDelay(30, 50)));
      printLetter(string, index + 1);
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      clearPlaceholder(string, index);
    }
  };

  const clearPlaceholder = async (string, index) => {
    if (index > 0) {
      setTypingText((prev) => prev.slice(0, -1));
      setPhCount(index - 1);
      await new Promise((resolve) => setTimeout(resolve, randDelay(30, 50)));
      clearPlaceholder(string, index - 1);
    } else {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }
  };

  useEffect(() => {
    const currentPlaceholder = `"${placeholders[placeholderIndex]}"`;
    setTypingText('');
    setPhCount(0);
    printLetter(currentPlaceholder, 0);
  }, [placeholderIndex]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    // console.log('Searching for:', searchTerm);
  };

  const styles = `
    .search-bar {
      display: flex;
      justify-content: center;
    }
    
    .search-bar__input-wrapper {
      position: relative;
    }
    
    .search-bar__input {
      width: 450px;
      padding: 6px 20px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 50px; 
      outline: none;
      transition: all 0.3s ease-in-out;
      padding-left: 40px; 
    }
    
    .search-bar__input::placeholder {
      color: black;
    }
    
    .search-bar__input {
      color: black;
      background-color:#F2F4F4;
      border:2px solid gray;
    }
    .search-bar__input:focus {
        background-color:#ffffff;
      }

    .search-icon {
      position: absolute;
      top: 50%;
      left: 15px; 
      transform: translateY(-50%);
    }
    @media all and (max-width: 767px) {
        .search-bar__input {
            width: 300px;
          }
    }
    @media all and (min-width: 768px) and (max-width: 991px) {
        .search-bar__input {
            width: 290px;
          }
    }
    @media all and (min-width: 1281px) and (max-width: 1600px) {
      .search-bar__input {
        width: 560px;
      }
    }
  `;

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <style>{styles}</style>
      <div className="search-bar__input-wrapper">
        <i className="bi bi-search search-icon"></i> {/* Bootstrap search icon */}
        <input
          id="searchBar__input"
          type="text"
          name="q"
          maxLength="2048"
          aria-label="Search for items, brands, or styles…"
          aria-haspopup="dialog"
          aria-controls="search-suggestions"
          data-testid="searchBar__input"
          className="search-bar__input"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder={`Search for ${typingText}`}
          style={{ color: 'black' }}
        />
      </div>
    </form>
  );
};

export default SearchBar;


// import React, { useState, useEffect } from 'react';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// const SearchBar = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [typingText, setTypingText] = useState('');
//   const [placeholderIndex, setPlaceholderIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [phCount, setPhCount] = useState(0);
//   const [placeholders] = useState([
    // 'Pink Pattu Saree',
    // 'Temple Necklace Set',
    // 'green t-shirt',
    // 'Boys Kurta Pyjama'
//   ]);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   const randDelay = (min, max) => {
//     return Math.floor(Math.random() * (max - min + 1) + min);
//   };

//   const printLetter = async (string, index) => {
//     const arr = string.split('');
//     if (index < arr.length) {
//       setTypingText((prev) => prev + arr[index]);
//       setPhCount(index + 1);
//       await new Promise((resolve) => setTimeout(resolve, randDelay(30, 50)));
//       printLetter(string, index + 1);
//     } else {
//       await new Promise((resolve) => setTimeout(resolve, 1500));
//       clearPlaceholder(string, index);
//     }
//   };

//   const clearPlaceholder = async (string, index) => {
//     if (index > 0) {
//       setTypingText((prev) => prev.slice(0, -1));
//       setPhCount(index - 1);
//       await new Promise((resolve) => setTimeout(resolve, randDelay(30, 50)));
//       clearPlaceholder(string, index - 1);
//     } else {
//       setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
//     }
//   };

//   useEffect(() => {
//     const currentPlaceholder = `"${placeholders[placeholderIndex]}"`;
//     setTypingText('');
//     setPhCount(0);
//     printLetter(currentPlaceholder, 0);
//   }, [placeholderIndex]);

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearch = (event) => {
//     event.preventDefault();
//     // console.log('Searching for:', searchTerm);
//   };

//   const styles = `
//     .search-bar {
//       display: flex;
//       justify-content: center;
//     }
    
//     .search-bar__input-wrapper {
//       position: relative;
//     }
    
//     .search-bar__input {
//       width: 450px;
//       padding: 6px 20px;
//       font-size: 16px;
//       border: 1px solid #ccc;
//       border-radius: 50px; 
//       outline: none;
//       transition: all 0.3s ease-in-out;
//       padding-left: 40px; 
//     }
    
//     .search-bar__input::placeholder {
//       color: black;
//     }
    
//     .search-bar__input {
//       color: black;
//       background-color:#F2F4F4;
//       border:2px solid gray;
//     }
//     .search-bar__input:focus {
//         background-color:#ffffff;
//       }

//     .search-icon {
//       position: absolute;
//       top: 50%;
//       left: 15px; 
//       transform: translateY(-50%);
//     }

//     .mobile-search-icon {
//       font-size: 30px;
//       cursor: pointer;
//     }

//     @media all and (max-width: 767px) {
//       .search-bar__input-wrapper {
//         display: none;
//       }
//       .mobile-search-icon {
//         display: block;
//       }
//     }
    
//     @media all and (min-width: 768px) {
//       .search-bar__input-wrapper {
//         display: block;
//       }
//       .mobile-search-icon {
//         display: none;
//       }
//     }
//     @media all and (min-width: 768px) and (max-width: 991px) {
//       .search-bar__input {
//         width: 290px;
//       }

//     }
    // @media all and (min-width: 1281px) and (max-width: 1600px) {
    //   .search-bar__input {
    //     width: 560px;
    //   }
    // }
//   `;

//   return (
//     <>
//     <div className="search-bar-container">
//       <style>{styles}</style>
//       {isMobile ? (
//         <>
//         <i className="bi bi-search mobile-search-icon fs-2 ms-3" style={{cursor:"pointer"}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop"></i>
//     {/* <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Toggle top offcanvas</button> */}
    // <div className="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
    //   <div className="offcanvas-header">
    //     <h5 id="offcanvasTopLabel">Search</h5>
    //     <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    //   </div>
    //   <div className="offcanvas-body">
     
        
    //   </div>
    // </div>
//     </>
//       ) : (
//         <form onSubmit={handleSearch} className="search-bar">
//           <div className="search-bar__input-wrapper">
//             <i className="bi bi-search search-icon"></i> 
//             <input
//               id="searchBar__input"
//               type="text"
//               name="q"
//               maxLength="2048"
//               aria-label="Search for items, brands, or styles…"
//               aria-haspopup="dialog"
//               aria-controls="search-suggestions"
//               data-testid="searchBar__input"
//               className="search-bar__input"
//               value={searchTerm}
//               onChange={handleInputChange}
//               placeholder={`Search for ${typingText}`}
//               style={{ color: 'black' }}
//             />
//           </div>
//         </form>
//       )}
//     </div>
//     </>
//   );
// };

// export default SearchBar;
