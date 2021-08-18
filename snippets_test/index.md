# VS Code Snippets 测试

测试一下 VS Code Snippets.
<!--more-->

## admonition

{{< admonition type=tip title="Tip" open=false >}}
This is a tip
{{< /admonition >}}

{{< admonition type=note title="Note" open=false >}}
This is a note
{{< /admonition >}}

{{< admonition type=warning title="Warning" open=false >}}
This is a warning.
{{< /admonition >}}

## link

[youtube](www.youtube.com)

## image

![this is alt text](/images/lighthouse.webp "this is a caption")

{{< image src="/images/lighthouse.webp" caption="this is a caption" title="this is alt text" width="50%" height="50%" >}}

## music

{{< music url="/music/Wavelength.mp3" name="Wavelength" artist="oldmanyoung " cover="/images/Wavelength.webp" >}}

## Bilibili

{{< bilibili id="BV1TJ411C7An" p=3 >}}

## Youtube

{{< youtube "w7Ft2ymGmfc" >}}

## TypeIt

### simple content

{{< typeit tag=h4 >}}
simple type it
{{< /typeit >}}

### code content

{{< typeit code=python >}}
print("hello world!")
{{< /typeit >}}

### group content

{{< typeit group=paragraph >}}
first one
{{< /typeit >}}

{{< typeit group=paragraph >}}
second one
{{< /typeit >}}

