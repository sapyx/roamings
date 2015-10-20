/**
 * Created by Sapyx on 27/08/2015.
 */

'use strict';

angular.module('roamingsApp')
    .value('defaultImages',
    {
        char_256: "data:image/jpg;base64,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vgd+0b8af2cPE/8Awlnwb8fXmjzuy/areNg9tdqP4ZoWykg9NwJHYg4I4migD9NP2dP+C33w/wDEsdv4e/aY8FSeH7w4Vte0GN7iyb/akgJMsI/3TL+A6fZHw6+LHwr+M2h/8JL8KfiBpPiCxKgtNpd4kpiJ/hkUHdG3+ywBHcZr8A60PDPizxT4K1iLxD4O8SahpN/Acw32m3jwTIfZ0IYfgaAP6BLm2xzis+6te2K/Jr4R/wDBXT9sT4ZrHY+IPE9h4vsY8DyfEllulVfaeIpIW93L/Q19K/C//gt18F/EIjsfi58Mda8PTtgNdabMl/bg92b/AFcij2Cvjpk9aAPsC6t+fu1m3dtgY21yXw5/bE/Zc+Mflw/D/wCNmg3NxL/q7G6uvstyx9BDOEkY/Ra7u6gUjCj8aAOfvLYj5dtZt1b8Z210F5bZ+XFZd3CCM7KAMC8tsjOKyryEj5tldDdw7RnbWXdwDLAigCtZR/xOK0la2s7drm8lWOKNS0kjthVHqT6V8Y/HP/gqZpmizTeHvgD4bj1CSMlTr2rxssOemYoeGYehcrz/AAkV8qfFH9oX40fGa4aX4j/ETUdRiZty2Jm8u2U+0KbYx/3znjnNAH6V/Ef9vb9lf4Tl7bVPiTBq13H/AMuXh1ftjE9xvQ+WpHTDODmvAPiT/wAFk9bcyWnwd+ENvbrz5d/4kumkb2PkwlQpH/XRhn1HX4gooA9c+Jv7dn7VnxYElv4k+MOpWtrJw1jorCxh2/3SIQpcf75avJZppbiVp55GeR2LPI7ZLH1J9abRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFd18NP2nf2hPg8I4vhv8AGHXtMhj+7ZpfNJbf9+JN0Z/Fa4WigD6++Gv/AAWN+O/h/wAu1+J/gvRfE0K/6y4t1axuW+pQNH+AjFfQfw0/4Knfsu/EVo7PxPe6h4TvHwpXWbXdAW9BNFuGPdwnvivy+ooA/bLRvE3hXxrpS654O8RWOq2Mn+rvNOvEmjb6MhIqK+tzjG2vxs8C/Efx78MdYXX/AIeeMNR0W8GN02n3TRbx6MAcOPY5HtX1d8Af+Cq/iGzmt/Df7Q+ipf2xYJ/wkOl24SeMf3pYR8rj1KbSB/Cx6gHxvRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH//Z",
        char_128: "data:image/jpg;base64,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",
        char_64: 'data:image/jpg;base64,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',
        type_64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo3NkJDRDY1RTI0MjA2ODExOTEwOUEzRTFCNEMwQzY2RiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4MThCNERGQjM4NEUxMUUwQkYzOUY1QURCOEY0RUFDNiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4MThCNERGQTM4NEUxMUUwQkYzOUY1QURCOEY0RUFDNiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjc3QkNENjVFMjQyMDY4MTE5MTA5QTNFMUI0QzBDNjZGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjc2QkNENjVFMjQyMDY4MTE5MTA5QTNFMUI0QzBDNjZGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+mf6KRAAAAx5JREFUeNrsWS2T4kAQ3d3CgceDDh6faDCo8BNQGBQGFD6GH4DC4MHjiQZ/aKK5V7yqvr5JyPG1ZFPXLVKTyczQb/q7+Tyfzx9lpq+PkpMBMAAGwAAYAANgAAyAASgxVe5aPZ1Od7td5qd6vR5FEcebzWY+n2MQhuFisdBrPM8LgqDRaKxWK/1JaLlcFiOBXxfieL/f41mtVtNrgG0ymRwOh2IkgBvtdDoUBZ6+77fb7ePxyPvebrfdbpcDPPFJNo7HYzzBNy4+SZL1eg1p6E9vAgDRO2rTarUwAEOHC5FLsIgBPolMuIxPaE4cxwKAkwUbMS+bF08jgf5oCThXIMB+ihcSXsE9btfRnxK4UegDrxZCoASeVIwCvBCvHE4mR39AsPhMB/UmI84HIH79GvdQfZi7I59er6ed1b2iexkAahEdUZoJzSURvsqOKy9UR7BFADkWDOXp9/tYgICQjgPNZrNIADlELmu1mhNJnjf3NwH4Pqdk6XS50unvILFmEtPBMgFwqoJ7AZRehT7tDw4DYAAMwE8IZIPB4HQ6zWYz1tp4ZQaGVwQalilIIX3fZz9C03A4lBSNG3UFjK/6hDAMWRjwnCiKZIyf4wBsIGkVHqQJQgIPOlb8kUCSJPwZKT5YYSHQsOejW1G6C5SuWvRrzgnpLVzGtlJ6ngOcoPn8KxKjXOIN6RleAzLh0WiEdJ/tN1wPzqKIMpNnmccufQKKZucn0hTHcTp7ZecPBTekAa4ghwwbcITAGam28My5+Gv0wAlsz1yr++TMbCPmlRdLQHh77/HLqfekwVYUsWFxrYX8j2w0CALY2fNCEKcBF3TvXpgK9CRHi/IkQMvAZrjUAoXA5sCNPFTSm29Hn1PCZ3qn2wto+EptqXdEYnFPBRL91YOpBNDrzgdNim4Bz/qFHjBK5wQoOuZlMlOLcqKk5iEjF4IpO2MYJePRAz3nzBPAPecxSYt3KknP89KsI3pysWaj4sQIapEU2hjDmJxMxlmfGWu0TmaewAHtzb8Q5SOKoM+RMQaAqvXcSkoDYAAMgAEwAAbAAPzPAH4LMAB8/uc1hN1YdAAAAABJRU5ErkJggg==",
        corp_32: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxEAAAsRAX9kX5EAAATpSURBVFhHvZZ3TxxJEEf7kyGSMSBZxoAAIYEx0WSTgwlmySbnnHNONhl/tb59tdS4d1gfutPp/njaXZjp17+qmt41v379sk9PT8Lj4+MLHh4ehPv7e3t3dyfc3t4KNzc3L7i+vhZ+/vwp/PjxQ7i6ugrj8vLSXlxcWBNJ9G9kKvLLEKns/PxcODs78zD/VarXRKenpx4nJyce5p+KVIZIZX8S+WXHx8f26OhIODw8FMwfRU4i2N3dtTs7O3Lz34nW19ft2tqaJzs8CokODg6E/f19j729PWs0kVu+SIlGRkZsfX293draCkvkiYISFm1ubrZNTU2yuCsCQmiQ7e1twfhFyvbOtt3Y2PBSLyws2O7ubvmbm+jg4HciNvf9+3c7MDAg1yGYnZ21c3Nz8p7/w+bmpsA1BlkoUSiNJpqcnLRfvnyx09PTnkxTsSkWHRsbs6Ojo3Zqasqura95EhbndXl52ZaWlkpFaI22B1ZXVwWj5fP3aWVlxX779i140YpXvtW1VdvV1WUrKipsTU2NlBtqa2tF1NjYKJtRGVVra2uTqiwtLcmabIr3sLi4aI2WL6xPO9qnLS8VacvLy217e7ukp3xuKmRsrri4WK5BBEhCsgW5Bubn52UNMIh0KBBR8o6ODjs+Pu71aXh42H7+/FkGUUtHGk3kppqYmJBrqYaKqAptYN2ZmRkBD3837kCQJhAI2KKiIrkYERfyeWhoKCRa1vJFTjQbhGrl5+fbzs5OuZ/hzc7OluoQjPlio2D8iaC/v99LRX+bmps80fycIwtOOGgiTYUA+cePH2UziFpbW6WSfNbhBaMieuUmAm5kEXatIrd8KlM0Fdcj4V7EKnMZDraTDRm3fP5UpCgpKXkhc0UqiySprq6WeUBEC3kaYHBw0MP4E7kiTr6qqqowUWTZiAyoJxoKibg/JyfHk3FA0V7o6+uzvb291oSnCheRgGfelanITeUmUhHU1dXZrKwsT9bT0yMwlIHugAy8+VP5EDGAhYWFjihcpiJN1NcbEqmsrKxMph9RVxd0CRxwQIsNorDy0adnAQOUnp7+UvScSEXd3c+pgqJAICQB5AUFBSICHm3goFKMm0hTsTAyXj98+CCV0NJFEvlTAUf027dvpQ2Ivn79Kq8czcBnAhp/Kk4sds5JhogpTklJkZ1HEkVKhSAzM1Oqh4gAvOdAa2hoFIdiQgOhqQLSt8TERLlYRWlpaTYjI0MWdkUqcxO1tLTY3Nxc++bNG/nCQlJZWWmjo6MlSENDgwdPidFUmoh/8DXMrlVCOd+/fy8L8HdP1twS+gECQRHlJmlcXJwEUREbYZiBa4B1wLhpwE3ERjQVC1GF2NhYm5qaaj99+iRfwcCgIY6JibHJycny6KqIjbABZLyyJlRXQ7U1/vLpdzxljI+Pl+OUeQA2weL0NykpSTZDaSk3w0pCV8RnNsW13IcQONwU4w6EioBvs4SEBFmkvj6UhmPZLZ+iQhbXqvBee//u3TuR8RnYjGK0TwwEaOlYlFctGYtERUVJZTSJCwI2SGKkDDECfsTQBvc96EaNmwhpeJ9+C3S4eCy1fJES0Q5apzIVAfcqbBaMX6SoREWuREHiTxVJAvwYcaFCYPyiSKkiifypXhMp+jgCT4/5v0QKw+1i/DK/6DWZK/LLXCHnhpKXl/dMnv0LhMBS675MxEIAAAAASUVORK5CYII=",
        ally_32: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAANkSURBVFhHYxgFFAJGY2NjViibvgBk8YTeCV7Zmdl9kpKSXFBh+oEQ3xCVvbv3Puvt7v2rq61bDRRihshQFzACMQuEiQEYfX18l6urqW9hYWGxhIqhA0YtLS02KJs0AAriKROmeGWkZ/TiCWIeIAY5kAPMQwLgKOqZ4JOVmdVPVhSFhFAWxKAo2rNrz2NKoogx0D9wJb4gbq4ulgf6VATKRQeMfj5+iwlEEUGAM4hBYMHUhvKelopmKBcb4AZinPopBos6Ag5uXNh6S1hYmBcqRD+gq6sruHtm1O99yyv+ANOLK1SYfqAiPyH04uay/2c2lP2f0NsxF5gW+IHCVCkVMYrXwqz41GXT61Yt6MtaM78zavWyrqBVW6b5XX9wpOP/szMz/5/aMfXzkV2LruzbPPfcjnUzj2xbPfNISox/C1ArchmCr0yBAFCh0dfV55+emo6e94W0lITnZMd7/FkwIfP/SaDP7xzu+P/q0vz/b+9s+v/gZP//M1ur/i+bkvw/P8Hlr7qy+Dp2dnZFqF4Ge3t7lkn9kzwL8wsniIuLgxImdhAUFKSKJ++D2MHcnOyPFKRF/2fHuf6/dmTG/2v7Wv4varL5nxum8d9MU+Q9LwdLCVAdSsETEBCgvH/PfqLKFIJ5Hwikgl20zh7b1PZ/+8IysEPO727/X5bs+JWNjc0TKA8KanRAjLlwgDfvg8CmGfn3Tu6c+j/MVem/qCD3/+6ahP9zO1L+AYPaBaoEGyBoLlGgJD/L4Oi6jv/uNnr/VWQE33NyMJ9XkeL/P6Mt+X9FUeocoBJsIUA9MKG7vCU50uk/Fxf7dSDXCYi5ONhYqgx15L5Nbit+zMvLKwxWSCuQHe91gZWFZQOQqQARAQOQr23DfO2vqaiouEGEqABA5UFcXBzIQCYQX15enkNYgC8ayMRV9IooSovpQdlM8fHxDkCaHcIlEejp6XEvnLdwypaNW96GhYSVAYVISjw9XT2Z+3bve5WXkzeNi4tLAipMEmAE5ttJ8XHxv/j5+duAfPylGBqora0NLMgv+KWvp78HyOWDiJIIlJWVQUFoKcwvDKKxAZzFq46OjgaQchQQEPAB0iQ3RggCUPro7+kPABWvoqKioDxOXwBqsu3ZuYfmrWJ8gKTilVaAOsXrKBg4wMAAANLDLMSuEIlWAAAAAElFTkSuQmCC",

        deployables_64: "data:image/png;base64,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"
    });