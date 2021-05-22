describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry:nth-child(1)');
    
    expect(page.url()).toMatch("#entry1");

  }, 300000);

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 

    await page.waitForSelector('header > h1')
    let header = await page.evaluate(()=> {
        return document.querySelector('header > h1').innerHTML
    })

    expect(header).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
        await page.waitForSelector('entry-page')
        let entry = await page.evaluate(()=> {
            return document.querySelector('entry-page').entry
        })
    
        expect(entry.title).toBe("You like jazz?")
        expect(entry.date).toBe("4/25/2021")
        expect(entry.content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.")
        expect(entry.image['src']).toBe("https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455")
        expect(entry.image['alt']).toBe("bee with sunglasses")
        expect(entry.audio).toBe(undefined)
  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
        let body = await page.evaluate(()=> {
            return document.body.className;
        })

        expect(body).toBe("single-entry")

  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('header > img');
    expect(page.url()).toMatch("/#settings");

  }, 300000);

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”

    await page.waitForSelector('header > h1')
    let header = await page.evaluate(()=> {
        return document.querySelector('header > h1').innerHTML
    })

    expect(header).toBe("Settings");

  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    let body = await page.evaluate(()=> {
      return document.body.className;
    })

  expect(body).toBe("settings")
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();

    expect(page.url()).toMatch("/#entry1");
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it('test11: Clicking the back button once should bring the user back to the home page', async() => {
    // implement test11: Clicking on the back button should update the URL to be ‘http://127.0.0.1:5500/’
    await page.goBack();

    expect(page.url()).toBe("http://127.0.0.1:5500/");
  });

  // define and implement test12: When the user is on the homepage, the header title should be “Journal Entries”
  it('test12: When the user if on the homepage, the header title should be “Journal Entries"', async() => {
    // implement test12: When the user is on the homepage, the header title should be “Journal Entries"
    await page.waitForSelector('header > h1')
    let header = await page.evaluate(()=> {
        return document.querySelector('header > h1').innerHTML
    })

    expect(header).toBe("Journal Entries");
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it('Test13: On the home page the <body> element should not have any class attribute', async () => {
    // implement test13: On the home page the <body> element should not have any class attribute
    let body = await page.evaluate(()=> {
      return document.body.className;
    })

    expect(body).toBe("")
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    // implement test14: Verify the url is correct when clicking on the second entry’
    await page.click('journal-entry:nth-child(2)');
    
    expect(page.url()).toMatch("#entry2");
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it('Test15: Verify the title is current when clicking on the second entry', async() => {
    // implement test15: Verify the title is current when clicking on the second entry’
    await page.waitForSelector('header > h1')
    let header = await page.evaluate(()=> {
        return document.querySelector('header > h1').innerHTML
    })
  
    expect(header).toBe('Entry 2');
  });
 

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: On second Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the second journal entry should contain the following contents: 
        { 
          title: 'Run, Forrest! Run!',
          date: '4/26/2021',
          content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
          image: {
            src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
            alt: 'bee with sunglasses'
          }
        }
      */
        await page.waitForSelector('entry-page')
        let entry = await page.evaluate(()=> {
            return document.querySelector('entry-page').entry
        })
    
        expect(entry.title).toBe("Run, Forrest! Run!")
        expect(entry.date).toBe("4/26/2021")
        expect(entry.content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.")
        expect(entry.image['src']).toBe("https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg")
        expect(entry.image['alt']).toBe("forrest running")
        expect(entry.audio).toBe(undefined)
      
  }, 10000);

  // create your own test 17
  it('Test17: Clicking the settings icon, new URL should contain #settings, and tiltle should be settings', async () => {
    // implement test17: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('header > img');
    expect(page.url()).toContain("/#settings");
    await page.waitForSelector('header > h1')
    let header = await page.evaluate(()=> {
        return document.querySelector('header > h1').innerHTML
    })
    expect(header).toBe("Settings");
  }, 300000);

  // create your own test 18
  it('Test18: tap three go back button will not take us take us out of the page', async () => {
    // implement test18: tap three times go back button will take us out of the page

     await page.goBack();
     await page.goBack();
     await page.goBack();

     expect(page.url()).toBe("about:blank");
  }, 300000);

  // create your own test 19
  it('Test19: tap three go forward button will take us to the homepage with URL "http://127.0.0.1:5500/"', async () => {
    // implement test19: tap three times go back button will take us out of the page

     await page.goForward();

     expect(page.url()).toBe("http://127.0.0.1:5500/");
  }, 300000);

  // create your own test 20
  it('Test20: tap three go forward button will take us to the homepage with URL contain "/#entry13"', async () => {
  // implement test20: Verify the url is correct when clicking on the third entry’
    await page.click('journal-entry:nth-child(3)');
    
    expect(page.url()).toMatch("#entry3");
  }, 300000);
  
});
