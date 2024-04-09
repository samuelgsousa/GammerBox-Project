import json

class Avaliacoes:
    def __init__(self, star1, star2, star3, star4, star5):
        self.star1 = star1
        self.star2 = star2
        self.star3 = star3
        self.star4 = star4
        self.star5 = star5


class Usuario:
    def __init__(self, nome, foto_perfil, seguidores, horas_jogadas, generos_favoritos, avaliacoes, streamer, seguindo):
        self.nome = nome
        self.foto_perfil = foto_perfil
        self.seguidores = seguidores
        self.horas_jogadas = horas_jogadas
        self.generos_favoritos = generos_favoritos
        self.avaliacoes = avaliacoes
        self.streamer = streamer
        self.seguindo = seguindo

    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)

user_stars = Avaliacoes(12, 19, 3, 5, 2)

usuario1 = Usuario("Narutinho 123", "../images/profile/General/profile-picture.jpg", 7500, 4556, ["Terror", "Ação", "Aventura"], user_stars, True, ["Ellie 1", "Ellie 2", "Ellie 3"] )

print("Encod into JSON formatted Data")

usuario1JSONData = json.dumps(usuario1.toJson(), indent=4)
print(usuario1JSONData)

print("Decode JSON formatted Data")
usuario1JSON = json.loads(usuario1JSONData)
print(usuario1JSON)

#av_Val = Avaliacoes(1, 2, 3, 4, 5).__dict__

