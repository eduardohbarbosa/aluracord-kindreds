import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

//Informações do SUPABASE
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQwMDY0MCwiZXhwIjoxOTU4OTc2NjQwfQ.Zk6-ED8Y-p36hTyOnkCuvAvNujnFH895X3jg4JGM980';
const SUPABASE_URL = 'https://ajeylcqwnohotupqmcdn.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


export default function ChatPage() {
    // Sua lógica vai aqui
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username
    console.log("User: ", usuarioLogado)
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([ ]);

    pegaMensagens(setListaDeMensagens);

    function handleNovaMensagem(novaMensgem) {
        const mensagem = {
            //id: listaDeMensagens.length + 1,
            de: usuarioLogado,
            texto: novaMensgem,
        }

        insereDadosBanco(mensagem, listaDeMensagens, setListaDeMensagens)
        setMensagem('')
    }


    // ./Sua lógica vai aqui
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundImage: `url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Kindred_3.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    border: `solid 2px ${appConfig.theme.colors.newColors["250"]}`,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    backgroundColor: `${appConfig.theme.colors.newColors['000']}`,
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        border: `solid 2px ${appConfig.theme.colors.newColors["250"]}`,
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: `${appConfig.theme.colors.newColors['000']}`,
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {listaDeMensagens.length === 0 ? <LoadMessage /> :
                        <MessageList
                            mensagens={listaDeMensagens}
                            removeMensagens={(id) => {
                                setListaDeMensagens(
                                    listaDeMensagens.filter((mensagem) => {
                                        return mensagem.id != id
                                    })
                                )
                            }}
                        />
                    }
                    {/*{listaDeMensagem.map((mensagemAtual) =>{
                        return(
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleNovaMensagem(mensagem);
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value;
                                setMensagem(valor);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                console.log(':sticker:', sticker);
                                handleNovaMensagem(':sticker: ' + sticker);
                            }}
                        />
                        <Button
                            type='submit'
                            label='Enviar'
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.newColors["300"],
                                mainColorLight: appConfig.theme.colors.newColors["300"],
                                mainColorStrong: appConfig.theme.colors.primary["000"],
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'end' }} >
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
};

function LoadMessage() {
    return (
        <Box
            styleSheet={{
                display: "flex",
                justifyContent: "center"
            }}
        >
            <Image
                styleSheet={{
                    width: '400px',
                    borderRadius: '20px',
                }}
                src={`https://media2.giphy.com/media/3oKIP73vEZmJjFNXtC/giphy.gif?cid=790b76112a05c8dce79659e51770f53b15eb2f6708159392&rid=giphy.gif&ct=g`}
            />
        </Box>
    )
}

function MessageList(props) {
    console.log(props);

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (

                    <Box
                        styleSheet={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}
                    >
                        <Text
                            key={mensagem.id}
                            tag="li"
                            styleSheet={{
                                borderRadius: '5px',
                                padding: '6px',
                                marginBottom: '12px',
                                flexGrow: 2,
                                hover: {
                                    backgroundColor: appConfig.theme.colors.neutrals[700],
                                }
                            }}
                        >

                            <Box
                                styleSheet={{
                                    marginBottom: '8px',
                                }}
                            >

                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}
                                    src={`https://github.com/${mensagem.de}.png`}
                                />
                                <Text tag="strong">
                                    {mensagem.de}
                                </Text>
                                <Text
                                    styleSheet={{
                                        fontSize: '10px',
                                        marginLeft: '8px',
                                        color: appConfig.theme.colors.neutrals[300],
                                    }}
                                    tag="span"
                                >
                                    {(new Date().toLocaleDateString())}
                                </Text>
                            </Box>
                            {/* Condicional */}
                            {mensagem.texto.startsWith(':sticker:')
                                ? (
                                    <Image src={mensagem.texto.replace(':sticker:', '')} 
                                    styleSheet={{
                                        width: '200px'
                                    }}
                                    />
                                )
                                : (
                                    mensagem.texto
                                )}
                        </Text>

                        <Button onClick={() => {
                            props.removeMensagens(mensagem.id)
                        }}
                            label="X"
                            styleSheet={{
                                color: "white",
                            }}
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.newColors["300"],
                                mainColorLight: appConfig.theme.colors.newColors["300"],
                                mainColorStrong: appConfig.theme.colors.primary["000"],
                            }}
                        />
                    </Box>
                )
            })
            }
        </Box>
    )
};

function pegaMensagens(setListaDeMensagens) {
    return (
        React.useEffect(() => {
            supabaseClient
                .from('mensagens')
                .select('*')
                .order('id', { ascending: false })
                .then(({ data }) => {
                    console.log('Dados da consulta:', data[0]);
                    setListaDeMensagens(data);
                });

            escutaMensagensEmTempoReal((novaMensgem) => {
                //handleNovaMensagem(novaMensgem)
                setListaDeMensagens((valorAtualDaLista) => {
                    return(
                        [
                            novaMensgem,
                            ...valorAtualDaLista
                        ]
                    )
                });
            });
        }, [])
    )
};

function insereDadosBanco(mensagem) {
    return (
        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                // setListaDeMensagens([
                //     data[0],
                //     ...listaDeMensagens
                // ]);
            })
            )
};

function escutaMensagensEmTempoReal(adicionaMensagem){
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new)
        })
        .subscribe();
}