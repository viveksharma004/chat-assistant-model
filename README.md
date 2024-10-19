# Chat Assistant Api

- API_URL :   https://chat-assistant-model.onrender.com
- Sample Data Fetch :
        
  
        const value="What about this website?";
        const options = {
        method: "POST",
        body: JSON.stringify({
          message: value,
        }),
        headers: {
          "Content-type": "application/json",
        },
      };

  
  
        const response = await fetch("https://chat-assistant-model.onrender.com/gemini", options);
  - Response : {
          "response": "This website connects students and tutors.  
                 Tutors can upload video lectures, set prices, and manage their courses.  
                 Students can browse courses, purchase them, and track their progress.  
                 The site uses Razorpay for payments and offers refunds within 30 days.  
                 It's designed to be easy to navigate and is free to use.\n"
          }
