import folium

# Центр Петербурга
spb = [59.939095, 30.315868]

# Создаем карту
m = folium.Map(
    location=spb,
    zoom_start=12,
    tiles="CartoDB dark_matter"
)

# Слой легенд
legends = folium.FeatureGroup(name="Легенды")

places = [

{
    "name": "Башня Грифонов",
    "coords": [59.938182, 30.283633],
    "image": "./images/griffon.jpg",
    "address": "2-я линия В.О., 16",
    "desc": "Легенда о тайном алхимике Пеле и загадочных грифонах."
},

{
    "name": "Ротонда",
    "coords": [59.925755, 30.325768],
    "image": "./images/rotonda.jpg",
    "address": "Гороховая ул., 57",
    "desc": "Мистический портал Петербурга и место множества городских легенд."
},

{
    "name": "Призрак Распутина",
    "coords": [59.923276, 30.330856],
    "image": "images/rasputin.jpg",
    "address": "Гороховая ул., 64",
    "desc": "Легенда о духе Григория Распутина, который до сих пор не покидает свой дом."
},

{
    "name": "Проклятие Кикиморы",
    "coords": [59.952699, 30.325958],
    "image": "./images/troitskaja_ploshad`(1).jpg",
    "address": "Троицкая площадь",
    "desc": "Древнее предание о загадочном существе и проклятии города."
},

{
    "name": "Анна Иоанновна",
    "coords": [59.945162, 30.335707],
    "image": "./images/letnij-sad.jpg",
    "address": "Летний сад",
    "desc": "История о призрачном двойнике императрицы."
}

]

for place in places:

    html = f"""
    <div style="width:260px">

        <img src="{place['image']}"
             width="100%"
             style="
             border-radius:12px;
             margin-bottom:10px;">

        <h3 style="
        margin:0 0 10px 0;">
        {place['name']}
        </h3>

        <p>
        {place['desc']}
        </p>

        <p>
        <b>Адрес:</b><br>
        {place['address']}
        </p>

    </div>
    """

    icon_colors = {
    "Башня Грифонов": "blue",
    "Ротонда": "red",
    "Призрак Распутина": "green",
    "Проклятие Кикиморы": "purple",
    "Анна Иоанновна": "orange"
}

for place in places:

    html = f"""
    <div style="width:260px">

        <img src="{place['image']}"
             width="100%"
             style="
             border-radius:12px;
             margin-bottom:10px;">

        <h3>{place['name']}</h3>

        <p>{place['desc']}</p>

        <p>
        <b>Адрес:</b><br>
        {place['address']}
        </p>

    </div>
    """

    folium.Marker(
        place["coords"],

        tooltip=place["name"],

        popup=folium.Popup(
            html,
            max_width=320
        ),

        icon=folium.Icon(
            color=icon_colors[place["name"]]
        )

    ).add_to(legends)



# Добавляем слой на карту
legends.add_to(m)

# Переключатель слоев
folium.LayerControl().add_to(m)

# Сохраняем
m.save("map.html")

print("Карта успешно создана!")