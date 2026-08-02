# Segurança do portfólio

## Formulário de contato

O navegador envia mensagens somente para `POST /api/contact`. Depois das validações, a função encaminha a mensagem para o endpoint AJAX oficial do FormSubmit. Manter o endereço do FormSubmit no servidor impede que o formulário público contorne as proteções abaixo:

- limite local de 5 requisições a cada 10 minutos por IP em cada instância da função;
- limite de 8 KB para o corpo da requisição;
- lista fechada de campos e validação de tipos, formatos e comprimentos;
- honeypot, tempo mínimo de preenchimento e limite de links;
- verificação da origem da requisição;
- timeout no provedor de e-mail e respostas sem detalhes internos;
- bloqueio de métodos e tipos de conteúdo não permitidos.

O cliente também impede envios simultâneos e aplica um intervalo local de 30 segundos. Essa camada melhora a experiência, mas a proteção efetiva permanece no servidor.

## Configuração de produção na Vercel

O formulário continua funcional com a configuração padrão. Para ocultar o destinatário também do código-fonte do servidor, gere um endpoint invisível no FormSubmit e defina `CONTACT_FORM_ENDPOINT` em **Project > Settings > Environment Variables** na Vercel. O formato esperado é:

```text
https://formsubmit.co/ajax/seu-token-invisivel
```

Se houver outros domínios legítimos que precisam chamar a função, inclua-os em `CONTACT_ALLOWED_ORIGINS`, separados por vírgula. Nunca coloque chaves privadas em variáveis iniciadas por `VITE_`, pois elas são incorporadas ao JavaScript público.

O limite em memória é uma camada complementar e pode variar entre instâncias serverless. Para um limite distribuído efetivo, publique uma regra em **Project > Firewall**:

- condição: `Request Path` é igual a `/api/contact`;
- estratégia: `Fixed Window`;
- janela: `10 minutos`;
- limite: `5 requisições`;
- chave: `IP`;
- ação: `429 / Rate Limit`.

A Vercel aplica a regra antes da execução da função, protegendo também contra picos distribuídos e custos desnecessários.

## Proteções gerais

Os cabeçalhos publicados em `vercel.json` restringem scripts, conexões, formulários, frames e recursos externos; bloqueiam MIME sniffing e reduzem informações enviadas no `Referer`. A Vercel já envia HSTS por padrão para forçar HTTPS. Dependências não utilizadas foram removidas e apenas o `package-lock.json` atualizado deve permanecer versionado.
