import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';

function Title(props) {
    const Tag = props.tag || 'h1';
    return (
        <>
            <Tag>{props.children}</Tag>

            <style jsx>{`
                ${Tag}{
                    color: ${appConfig.theme.colors.neutrals['000']};
                    font-size: 24px;
                    font-weigth: 600;
                }
            `}</style>
        </>
    );
}

export default function PaginaInicial() {
    //const username = 'eduardohbarbosa';
    const [username, setUsername] = React.useState('eduardohbarbosa');
    const router = useRouter();

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundImage: 'url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kindred_3.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover'
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        border: `solid 2px ${appConfig.theme.colors.newColors["250"]}`,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: `${appConfig.theme.colors.newColors['000']}`,
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault();
                            console.log('Alguém submeteu o formulario');
                            router.push(`/chat?username=${username}`)
                        }

                        }
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Title tag="h2">Flutue gentilmente para o oblívio.</Title>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.newColors['050'] }}>
                            {appConfig.name}
                        </Text>

                        {/*                         <input 
                            type="text"
                            value={username}
                            onChange={function (event){
                              console.log('usuario digitou', event.target.value);
                              //Onde está o valor?
                              const valor = event.target.value
                              //Trocar o valor da variavel através do React e avise quem precisa;
                              setUsername(valor);
                            }}
                        /> */}

                        {<TextField
                            value={username}
                            onChange={function (event) {
                                //console.log(event.target.value);
                                //Onde está o valor?
                                const valor = event.target.value
                                //Trocar o valor da variavel através do React e avise quem precisa;
                                setUsername(valor);
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals["000"],
                                    mainColor: appConfig.theme.colors.newColors["100"],
                                    mainColorHighlight: appConfig.theme.colors.newColors["200"],
                                    backgroundColor: appConfig.theme.colors.newColors["000"]
                                },
                            }}
                        />}
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.newColors["300"],
                                mainColorLight: appConfig.theme.colors.newColors["300"],
                                mainColorStrong: appConfig.theme.colors.primary["000"],
                            }}
                        />
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.newColors["000"],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.newColors["200"],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`https://github.com/${username.length >= 2 ? username : ""}.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals["000"],
                                backgroundColor: appConfig.theme.colors.newColors["300"],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username.length >= 2 ? username : ""}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}