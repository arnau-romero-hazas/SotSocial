curl -X POST http://localhost:8080/posts \
 -H 'Authorization: Basic m85us02s8bc' -H 'Content-type: application/json' \
 -d '{
        "image":"https://media.giphy.com/media/ihrA3vYbabfMhIlcaR/giphy.gif?cid=790b7611l9g48v02slry2mgk1r8a6mb37kxgsxuloo3fz0sz&ep=v1_gifs_search&rid=giphy.gif&ct=g",
        "text":"Lorem ipsum ..."
    }' -v