import axios from 'axios';

const myGit = `http://api.github.com/users/rockyFierro`;
const followGit = 'http://api.github.com/users/rockyFierro/following';

function makeEl(element) {
    return document.createElement(element);
}

const cardMaker = (obj) => {
    const card = makeEl('div');
    const proImg = makeEl('img');
    const cardInfo = makeEl('div');
    const cardName = makeEl('h3');
    const cardUName = makeEl('p');
    const cardLocation = makeEl('p');
    const cardProfile = makeEl('p');
    const cardProfileUrl = makeEl('a');
    const cardFollowers = makeEl('p');
    const cardFollowing = makeEl('p');
    const cardBio = makeEl('p');

    cardInfo.classList.add('class-info');
    card.classList.add('card');
    cardName.classList.add('name');
    cardUName.classList.add('username');
    cardName.textContent = obj.name;
    proImg.src = obj.avatar_url;
    cardUName.textContent = obj.login;
    cardLocation.text = `location: ${obj.location}`;
    cardProfile.textContent = "Profile: ";
    cardProfileUrl.src = obj.html_url;
    cardProfileUrl.textContent = obj.html_url;
    cardFollowers.textContent = `Followers: ${obj.followers}`;
    cardFollowing.textContent = `Following: ${obj.following}`;

    card.appendChild(proImg);
    card.appendChild(cardInfo);
    cardProfile.appendChild(cardProfileUrl);
    cardInfo.append(cardName,
        cardUName,
        cardLocation,
        cardProfile,
        cardFollowers,
        cardFollowing);

    return card;
}

function getCard(){
    axios
        .get(myGit)
        .then( response => {
            document.getElementsByClassName('cards')[0].appendChild(cardMaker(response.data));
        })
}

function getFollowers(){
    axios
        .get(followGit)
        .then( response => {
            response.data.forEach(
                el => {
                    axios
                        .get(el.url)
                        .then(
                            response => {
                                document.getElementsByClassName('cards')[0].appendChild(cardMaker(response.data));
                            }
                        )
                }
            );
        })
}

getCard();
getFollowers();


