// Script to create dummy content in Sanity
// Waits for the server to be up before making the request

const http = require('http');

// Function to check if server is up
function checkServerAvailable() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:3000', (res) => {
      resolve(true);
      req.destroy();
    });
    
    req.on('error', () => {
      resolve(false);
    });
    
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Function to wait until server is available
async function waitForServer(maxAttempts = 30, interval = 1000) {
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    process.stdout.write(`Waiting for development server to start (attempt ${attempts + 1}/${maxAttempts})...\r`);
    const isAvailable = await checkServerAvailable();
    
    if (isAvailable) {
      console.log('\nDevelopment server is up and running!');
      return true;
    }
    
    attempts++;
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  console.error('\nServer did not start within the expected time.');
  return false;
}

// Function to create dummy content
async function createDummyContent() {
  console.log('Creating dummy content in Sanity...');
  
  try {
    const response = await fetch('http://localhost:3000/api/sanity/create-dummy-content');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ Dummy content created successfully!');
    console.log('Created:', {
      author: data.author,
      categories: data.categories.length,
      posts: data.posts.length
    });
  } catch (error) {
    console.error('Error creating dummy content:', error.message);
    console.log('Note: You may need to upload some images to your Sanity studio first.');
    console.log('The API is expecting image references for blog posts.');
  }
}

// Main execution
async function main() {
  console.log('Checking for development server...');
  const serverAvailable = await waitForServer();
  
  if (serverAvailable) {
    await createDummyContent();
  }
}

main().catch(console.error);